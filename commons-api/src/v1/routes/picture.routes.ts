import { FastifyInstance, FastifyRequest } from 'fastify';
import { PictureController } from '../controllers';

export default async function pictureRoutes(server: FastifyInstance) {
  server.put(
    '/',
    {
      onRequest: [server.auth],
      schema: {
        body: {
          type: 'object',
          required: ['picture'],
          properties: {
            picture: {
              type: 'object',
            },
          },
        },
      },
    },
    PictureController.appendToUser,
  );
}
