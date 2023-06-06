import { FastifyReply, FastifyRequest } from 'fastify';
import { log } from 'console';
import ProductService from '../services/product.service';
import { createSession } from '../libs/stripe';
import OrderService from '../services/order.service';
import PurchaseRepository from '../services/purchase.repository';
import DecodedToken from '../../../../commons/src/v1/domain/dto/DecodedToken';
import { groupByMarketer } from '../utils';

interface IPurchase {
  costumer_address_id: number;
  products: { id: number; amount: number }[];
  freight: number;
}

class PurchaseController {
  async save(
    req: FastifyRequest<{
      Body: IPurchase;
    }>,
    rep: FastifyReply
  ) {
    const { costumer_address_id, freight, products } = req.body;

    // @ts-ignore
    const costumerId = req.user.id as number;

    try {
      const data_products = await Promise.all(
        products.map(async (_product) => {
          const product = await ProductService.get(_product.id);

          if (product) {
            return {
              id: _product.id,
              value: Number((product.price * 100).toFixed(2)),
              amount: _product.amount,
              name: product.name,
            };
          }

          return new Error('Invalid Product Id');
        })
      );

      const session = await createSession(data_products);

      log(products);

      await OrderService.createIntent({
        total: session.amount_total as number,
        costumer: { id: costumerId, address_id: costumer_address_id },
        freight,
        products,
        intent_payment_id: session.id,
      });

      return rep.send({ code: 200, data: session.url });
    } catch (e) {
      if (e instanceof Error) {
        return rep.status(400).send({ message: e.message, error: true });
      }
    }
    return rep
      .status(400)
      .send({ message: 'occurred an error in the server', error: true });
  }

  async historic(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.user as DecodedToken;

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
    const res = groupByMarketer(orderWithProducts);

    return res;
  }
}

export default new PurchaseController();
