import { FastifyInstance } from "fastify";

import OrderController from "../controllers/OrderController";

export default async function (server: FastifyInstance) {
  server.get("/triggerOrder", async (_req, rep) => {
    await OrderController.toQueue({
      intent_payment_id:
        "cs_test_a1UTbp7DuiHZBtutdEZYPtPL930R6X8gKbnLdRKwWv0kCpNHs5DYYfmU4m",
    });
    return true;
  });
}
