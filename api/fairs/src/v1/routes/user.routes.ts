import { FastifyInstance } from 'fastify';
import { MarketerController } from '../controllers';

export default async function userRoutes(server: FastifyInstance) {
  server.get(
    '/details',
    // @ts-ignore
    { onRequest: [server.auth] },
    MarketerController.details,
  );

  server.get(
    '/fairs',
    {
      // @ts-ignore
      onRequest: [server.auth],
    },
    MarketerController.listFairs,
  );
}
