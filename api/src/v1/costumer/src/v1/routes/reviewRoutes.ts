import { FastifyInstance } from 'fastify';
import ReviewController from '../controllers/ReviewController';

export default async function reviewRoutes(server: FastifyInstance) {
  server.post(
    '/purchase',
    { onRequest: [server.auth] },
    ReviewController.reviewPurchase
  );
  server.post(
    '/deliveryman',
    {
      onRequest: [server.auth],
    },
    ReviewController.reviewDeliveryman
  );
}
