import { FastifyInstance } from "fastify";

import OrderController from "../controllers/OrderController";

export default async function (server: FastifyInstance) {
  server.get("/triggerOrder", async (_req, rep) => {
    await OrderController.toQueue({
      intent_payment_id:
        "cs_test_a1iFp0BxnqwGbcmatcf6wsdW25q5W3bUqEIvgAhYbZ9NQZjx8K9fD1usuf",
    });
    return true;
  });
}
