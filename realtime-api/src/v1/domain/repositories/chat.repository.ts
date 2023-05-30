import { randomUUID } from 'crypto';
import { mongoDB } from '../../libs/index';
import { IMessage } from '../interfaces';
import { log } from 'console';
import { Message } from '../../../../database/prisma/generated/mongo';

class ChatRepository {
  async index(args: {
    senderId: number;
    receiverId: number;
  }): Promise<Message[] | false> {
    try {
      const { senderId, receiverId } = args;
      return await mongoDB.message.findMany({
        where: {
          senderId,
          receiverId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (err) {
      return [];
    }
  }

  async save(message: IMessage) {
    try {
      return await mongoDB.message.create({
        data: {
          id: randomUUID(),
          receiverId: message.to,
          senderId: message.from,
          content: message.content,
        },
      });
    } catch (err) {
      log(err);
      return null;
    }
  }
}

export default new ChatRepository();
