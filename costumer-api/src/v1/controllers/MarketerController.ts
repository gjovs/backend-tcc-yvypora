import { FastifyReply, FastifyRequest } from 'fastify';
import Marketer from '../services/marketer.service';

export class MarketerController {
  async get(req: FastifyRequest<{
    Params: {
      id: string
    }
  }>, rep: FastifyReply) {
    const { id } = req.params;

    const marketer = await Marketer.get(parseInt(id, 10));

    if (!marketer) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: 'Content not found!, check the id',
      });
    }

    return rep.send({
      code: 200,
      error: false,
      data: marketer,
    });
  }
}

export default new MarketerController();