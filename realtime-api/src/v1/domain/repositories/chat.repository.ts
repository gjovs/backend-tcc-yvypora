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
      console.log(senderId, receiverId);
      
      return await mongoDB.message.findMany({
        where: {
          senderId,
          receiverId,
        },
        orderBy: {
          createdAt: 'asc',
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
          receiverName: message.toName,
          senderId: message.from,
          senderName: message.fromName,
          content: message.content,
        },
      });
    } catch (err) {
      log(err);
      return null;
    }
  }

  async cleanMessagesInChat(args: { senderId: number, receiverId: number}) {
    const { receiverId, senderId } = args;
    try {
      await mongoDB.message.deleteMany({
        where: {
          senderId,
          receiverId
        }
      })
    } catch (err) {
      console.log(err);
      return null
    }
  }
}

export default new ChatRepository();
