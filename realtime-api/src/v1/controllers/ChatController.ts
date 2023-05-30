import { FastifyReply, FastifyRequest } from 'fastify';
import { ChatRepository } from '../domain/repositories';
import { log } from 'console';

class ChatController {
  async index(
    req: FastifyRequest<{
      Querystring: {
        receiverId: string;
        senderId: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { receiverId, senderId } = req.query;

    const res = await ChatRepository.index({
      receiverId: parseInt(receiverId, 10),
      senderId: parseInt(senderId, 10),
    });

    log(res)

    return rep.status(200).send({
      error: false,
      code: 200,
      data: res,
    });
  }
}

export default new ChatController();
