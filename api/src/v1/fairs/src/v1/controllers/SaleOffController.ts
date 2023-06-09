import { FastifyReply, FastifyRequest } from 'fastify';
import { Product } from '../services';

export class SaleOffController {
  async create(
    req: FastifyRequest<{
                 Params: {
                   id: string;
                 };
                 Querystring: {
                   value: string;
                 };
               }>,
    rep: FastifyReply,
  ) {
    const { id } = req.user;
    const productId = parseInt(req.params.id, 10);
    const value = parseFloat(req.query.value);
    const res = await Product.addSaleOff(id, productId, value);

    return rep.status(res.code).send({
      code: res.code,
      error: res.error,
      message: res.message,
    });
  }

  async delete(req: FastifyRequest<{
    Params: {
      id: string;
    };
  }>, rep: FastifyReply) {
    const { id } = req.user;
    const productId = parseInt(req.params.id, 10);

    const res = await Product.removeSaleOff(id, productId);

    return rep.status(res.code).send({
      code: res.code,
      error: res.error,
      message: res.message,
    });
  }
}

export default new SaleOffController();
