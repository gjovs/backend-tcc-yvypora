import { FastifyInstance } from 'fastify';
import { ChatController } from '../controllers';

export default async function chatRoutes(server: FastifyInstance) {
  server.get('/', {
    schema: {
      querystring: {
        type: 'object',
        required: ['receiverId', 'senderId'],
        properties: {
          receiverId: { type: 'number' },
          senderId: { type: 'number' }
        }
      }
    }
  }, ChatController.index)
}