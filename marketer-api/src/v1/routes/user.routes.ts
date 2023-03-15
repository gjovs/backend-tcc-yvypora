import { FastifyInstance } from 'fastify';
import { MarketerController } from '../controllers';

export default async function userRoutes(server: FastifyInstance) {
  server.get(
    '/details',
    { onRequest: [server.auth] },
    MarketerController.details,
  );

  server.get(
    '/fairs',
    {
      onRequest: [server.auth],
    },
    MarketerController.listFairs,
  );
}
