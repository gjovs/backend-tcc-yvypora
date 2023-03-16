import { FastifyInstance } from 'fastify';
import { MarketerController } from '../controllers';

export default async function marketerRoutes(server: FastifyInstance) {
  server.get(
    '/:id',
    MarketerController.get,
  );
}
