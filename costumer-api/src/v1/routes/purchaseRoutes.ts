import { FastifyInstance } from 'fastify';
import { PurchaseController } from '../controllers';
import OrderService from '../services/order.service';
import orderService from '../services/order.service';
import GoogleMapsService, { ILocations } from '../services/googleMaps.service';

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

  // REDIRECT AFTER PAYMENT

  server.get('cancel', (_req, rep) => {
    rep.redirect(`${process.env.SITE_URL as string}/?order=fail`);
  });

  server.get('success', (_req, rep) => rep.redirect(`${process.env.SITE_URL as string}/?order=success`));

  // WEB HOOK
  server.post('/stripe-hook-payment', async (req, rep) => {
    const event = req.body;

    console.log(event);

    // TODO handle payment types

    // EXAMPLE
    const payment_status = false;
    if (!payment_status) {
      await OrderService.updatePaymentStatus(false, 'Error on payment', event.id);
      return rep.send({ received: true });
    }

    await orderService.updatePaymentStatus(true, event.details, event.id);

    // TODO incorporate logistic service append to a queue to process

    // retrieve information from this order

    const specificationsOfOrder = await OrderService.get(event.id); // order fully data

    if (!specificationsOfOrder) return false;

    const dataRoutesForGoogleMaps: ILocations = {
      arrived: specificationsOfOrder.costumer_addresses.address,
    };

    // TODO send a axios request to logistic api?
    const route = await GoogleMapsService.findRoutes({}); // route for one random deliveryman

    return rep.send({ received: true });
  });
}
