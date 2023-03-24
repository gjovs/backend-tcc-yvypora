import { FastifyReply, FastifyRequest } from 'fastify';
import { Costumer } from '../services';

export class AddressController {
  async addToCostumer(
    req: FastifyRequest<{
      Body: {
        address: {
          cep: string;
          complemento: string;
          addressTypeId: number;
          number: number;
          city: string;
          uf: string;
          neighborhood: string;
          logradouro: string;
        };
      };
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply,
  ) {
    const { id } = req.params;
    const { address } = req.body;

    const exists = await Costumer.getCostumer(parseInt(id, 10));

    // @ts-ignore
    if (!exists.data) {
      return rep.status(404).send({
        error: true,
        message: 'This costumer do not exist',
      });
    }

    const res = await Costumer.addNewCostumerAddress({
      address,
      id: parseInt(id, 10),
    });

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }
    return rep.send(res?.message);
  }

  async removeToCostumer(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply,
  ) {
    const { id } = req.params;

    const res = await Costumer.deleteCostumerAddress(parseInt(id, 10));

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.message);
  }
}

export default new AddressController();
