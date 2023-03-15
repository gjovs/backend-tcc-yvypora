import { FastifyReply, FastifyRequest } from 'fastify';

export default async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const data: { payload: object } = await req.jwtVerify();
    req.user = data.payload;
  } catch (e) {
    return rep.send(e);
  }
};
