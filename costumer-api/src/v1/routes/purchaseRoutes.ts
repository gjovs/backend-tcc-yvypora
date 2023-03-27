import { FastifyInstance } from 'fastify';
import { PurchaseController } from '../controllers';

export default async function purchaseRoutes(server: FastifyInstance) {
  server.post('/', {
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
  }, PurchaseController.save);

  server.get('cancel', (_req, rep) => {
    rep.redirect(`${process.env.SITE_URL as string}/?order=fail`);
  });
  server.get('success', (_req, rep) => rep.redirect(`${process.env.SITE_URL as string}/?order=success`));
}
