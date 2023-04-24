import { FastifyInstance } from "fastify";

import OrderController from "../controllers/OrderController";

export default async function (server: FastifyInstance) {
  server.get("/triggerOrder", async (_req, rep) => {
    await OrderController.toQueue({
      intent_payment_id:
        "cs_test_a1mOET7R3NIbOeNfh7FRKzfPjQsyRZrH4Yz9ugtfvrNf8W2ZdUxTh3ehYK",
    });
    return true;
  });
}
