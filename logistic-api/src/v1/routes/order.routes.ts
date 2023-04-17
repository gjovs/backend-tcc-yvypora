import { FastifyInstance } from "fastify";
import OrderController from "../controllers/OrderController";
export default async function (server: FastifyInstance) {
  server.put(
    "/toQueue/:intent_payment_id",
    {
      schema: {
        params: {
          type: "object",
          required: ["intent_payment_id"],
          properties: {
            intent_payment_id: {
              type: "string",
            },
          },
        },
      },
    },
    OrderController.toQueue
  );
}
