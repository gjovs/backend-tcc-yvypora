import { FastifyInstance } from 'fastify';
import { PurchaseController } from '../controllers';

export default async function purchaseRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      onRequest: [server.auth],
      schema: {
        body: {
          type: 'object',
          required: ['costumer_address_id', 'products', 'freight'],
          properties: {
            freight: { type: 'number' },
            costumer_address_id: { type: 'integer' },
            products: {
              type: 'array',
              items: {
                type: 'object',
                required: ['id', 'amount'],
                properties: {
                  id: { type: 'integer' },
                  amount: { type: 'integer' },
                },
              },
            },
          },
        },
      },
    },
    PurchaseController.save
  );

  // REDIRECT AFTER PAYMENT
  server.get('cancel', (_req, rep) => {
    rep.redirect(`${process.env.SITE_URL as string}/?order=fail`);
  });

  server.get('success', PurchaseController.success);

  // WEB HOOK
  server.post(
    '/stripe-hook-payment',
    PurchaseController.stripeEvent
  );

  server.get(
    '/historic',
    { onRequest: [server.auth] },
    PurchaseController.historic
  );

  server.get(
    '/:id',
    {
      onRequest: [server.auth],
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number' },
          },
        },
      },
    },
    PurchaseController.get
  );
}
