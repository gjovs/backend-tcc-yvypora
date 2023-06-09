import { FastifyReply, FastifyRequest } from 'fastify';
import { Product } from '../services';

export default async (
  req: FastifyRequest<{ Params: { id: string } }>,
  rep: FastifyReply,
) => {
  try {
    const { id : ownerId } = req.user;
    const productId = parseInt(req.params.id, 10);
    const res = await Product.checkOwner(ownerId, productId);

    // @ts-ignore
    if (!res || res?.error) {
      return rep.status(401).send({
        error: true,
        code: 401,
        message:
          'this operation is not allowed because the owner token is not the same of the product owner',
      });
    }
  } catch (e) {
    return rep.status(401).send({
      error: true,
      code: 401,
      message:
        'this operation is not allowed because the owner token is not the same of the product owner',
    });
  }
};
