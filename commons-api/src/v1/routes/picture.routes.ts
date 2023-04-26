import { FastifyInstance } from 'fastify';
import { PictureController } from '../controllers';
import { uploadPictureSchema } from '../schemas/picture.schema';

export default async function pictureRoutes(server: FastifyInstance) {
  server.put(
    '/',
    {
      onRequest: [server.auth],
      schema: uploadPictureSchema
    },
    PictureController.appendToUser,
  );
}
