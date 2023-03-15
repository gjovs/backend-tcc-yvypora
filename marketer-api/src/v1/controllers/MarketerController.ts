import { FastifyReply, FastifyRequest } from 'fastify';
import { Marketer } from '../services';

export class MarketerController {
  async details(req:FastifyRequest, rep: FastifyReply) {
    return rep.send(req.user);
  }

  async listFairs(req: FastifyRequest, rep: FastifyReply) {
    // @ts-ignore
    const res = await Marketer.indexFairs(req.user.id);

    if (!res) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: 'Fairs not found with this marketer',
      });
    }

    return rep.send({
      code: 200,
      error: false,
      payload: res,
    });
  }

  async addFair(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply,
  ) {
    // @ts-ignore
    const { id } = req.user;

    const res = await Marketer.addFair(id, parseInt(req.params.id, 10));

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: 'Bad id or this relation already exist!',
      });
    }

    return rep.send({
      code: 200,
      payload: res?.data,
      error: false,
    });
  }

  async removeFair(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply,
  ) {
    // @ts-ignore
    const { id } = req.user;

    const res = await Marketer.removeFair(id, parseInt(req.params.id, 10));

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send({
      code: 200,
      payload: res?.message,
      error: false,
    });
  }
}

export default new MarketerController();
