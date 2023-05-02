import { FastifyReply, FastifyRequest } from 'fastify';

export interface IFastifyController {
  get(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply,
  ): Promise<any>;

  find(req: FastifyRequest, rep: FastifyReply): Promise<any>;

  store(
    req: FastifyRequest<{ Body: any }>,
    rep: FastifyReply,
  ): Promise<any>;

  update(
    req: FastifyRequest<{ Body: any }>,
    rep: FastifyReply,
  ): Promise<any>;

  delete(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply,
  ): Promise<any>;
}
