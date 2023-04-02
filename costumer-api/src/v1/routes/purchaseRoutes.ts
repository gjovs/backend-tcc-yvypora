import { FastifyInstance, FastifyRequest } from "fastify";
import { log } from "console";
import { PurchaseController } from "../controllers";
import OrderService from "../services/order.service";
import GoogleMapsService from "../services/googleMaps.service";

interface IStripePurchaseEvent {
  id: string;
  object: string;
  api_version: string;
  created: number;
  type: string;
  data: {
    object: {
      id: string;
      object: string;
      amount: number;
      amount_capturable: number;
      amount_details: object;
      amout_received: number;
      currency: string;
      description: string;
      status: string;
    };
  };
}

export default async function purchaseRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      onRequest: [server.auth],
      schema: {
        body: {
          type: "object",
          required: ["costumer_address_id", "products", "freight"],
          properties: {
            freight: { type: "number" },
            costumer_address_id: { type: "integer" },
            products: {
              type: "array",
              items: {
                type: "object",
                required: ["id", "amount"],
                properties: {
                  id: { type: "integer" },
                  amount: { type: "integer" },
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

  server.get("cancel", (_req, rep) => {
    rep.redirect(`${process.env.SITE_URL as string}/?order=fail`);
  });

  server.get("success", (_req, rep) => {
    rep.redirect(`${process.env.SITE_URL as string}/?order=success`);
  });

  // WEB HOOK
  server.post(
    "/stripe-hook-payment",
    async (
      req: FastifyRequest<{
        Body: IStripePurchaseEvent;
      }>,
      rep
    ) => {
      const event = req.body;

      const paymentIntent = event.data.object;

      switch (event.type) {
        case "payment_intent.succeeded":
          await OrderService.updatePaymentStatus(
            true,
            paymentIntent.description,
            paymentIntent.id
          );
          // TODO call the logistic service
          break;
        case "payment_intent.canceled":
          await OrderService.updatePaymentStatus(
            false,
            paymentIntent.description,
            paymentIntent.id
          );

          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // TODO req to logistic api

      return rep.send({ received: true });
    }
  );
}
