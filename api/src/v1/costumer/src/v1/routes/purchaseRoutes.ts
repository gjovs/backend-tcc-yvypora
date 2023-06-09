import { FastifyInstance, FastifyRequest } from 'fastify';
import { CompressionTypes } from 'kafkajs';
import { PurchaseController } from '../controllers';
import OrderService from '../services/order.service';
import KafkaProducer from '../../../../Kafka';
import ReviewController from '../controllers/ReviewController';
import { IStripePurchaseEvent } from '../domain/dto/stripeEvent.interface';


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

  server.get('success', async (_req, rep) => {
    const order = await OrderService.getLast();

    const res = await OrderService.updatePaymentStatus(
      true,
      'paid',
      order.intent_payment_id
    );

    const message = {
      succeeded: true,
      intent_payment_id: order.intent_payment_id,
    };

    // Calling the logistic service
    await KafkaProducer.producer.send({
      topic: 'payment_intent',
      compression: CompressionTypes.GZIP,
      messages: [{ value: JSON.stringify(message) }],
    });

    console.log('teste', order);

    rep.redirect(`${process.env.SITE_URL as string}/order/track`);
  });

  // WEB HOOK
  server.post(
    '/stripe-hook-payment',
    async (
      req: FastifyRequest<{
        Body: IStripePurchaseEvent;
      }>,
      rep
    ) => {
      const event = req.body;

      const paymentIntent = event.data.object;

      console.log('EVENTO STRIPE!');

      switch (event.type) {
        case 'payment_intent.succeeded':
          await OrderService.updatePaymentStatus(
            true,
            paymentIntent.description,
            paymentIntent.id
          );

          const message = {
            succeeded: true,
            intent_payment_id: paymentIntent.id,
          };

          // Calling the logistic service
          await KafkaProducer.producer.send({
            topic: 'payment_intent',
            compression: CompressionTypes.GZIP,
            messages: [{ value: JSON.stringify(message) }],
          });

          break;
        case 'payment_intent.canceled':
          await OrderService.updatePaymentStatus(
            false,
            paymentIntent.description,
            paymentIntent.id
          );

          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      
      return rep.send({ received: true });
    }
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
