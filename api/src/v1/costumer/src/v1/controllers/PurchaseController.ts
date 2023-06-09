import { FastifyReply, FastifyRequest } from 'fastify';
import PurchaseRepository from '../services/purchase.repository';
import { createSession } from '../libs/stripe';
import { IPurchase } from '../domain/dto/purchase.interface';
import PurchaseService from '../services/purchase.service';
import OrderService from '../services/order.service';

class PurchaseController {
  async save(
    req: FastifyRequest<{
      Body: IPurchase;
    }>,
    rep: FastifyReply
  ) {
    const { id : costumerId } = req.user;

    const { costumer_address_id } = req.body

    try {
      const productsWithNecessaryData = await PurchaseService.getDetailsOfProducts(req.body)

      const {
        id : sessionId ,
        amount_total,
        url
      } = await createSession(productsWithNecessaryData);


      const isSuccessful = await PurchaseService.registerIntentationOfPurchase({
        ...req.body,
        intent_payment_id: sessionId,
        total : amount_total as number,
        costumer: {
          address_id: costumer_address_id,
          id: costumerId,
        }
      })

      return rep.send({ code: 200, data: url });
    } catch (e) {
      if (e instanceof Error) {
        return rep.status(400).send({ message: e.message, error: true });
      }
    }
    return rep
      .status(500)
      .send({ message: 'occurred an error in the server', error: true });
  }

  async historic(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.user;

    const res = await PurchaseRepository.getHistoric(id);

    if (!res) {
      return rep.status(500).send({
        error: true,
        message: 'INTERNAL SERVER ERROR (ERROR ON DB)',
      });
    }

    return rep.send({
      error: false,
      data: res,
    });
  }

  async get(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const orderWithProducts = await PurchaseRepository.get(parseInt(id, 10));

    if (!orderWithProducts) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: 'Cannot find this order associated with this id',
      });
    }

    // separete by marketer
    const res = OrderService.groupByMarketer(orderWithProducts);

    return res;
  }
}

export default new PurchaseController();
