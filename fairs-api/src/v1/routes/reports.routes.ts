import { FastifyInstance } from "fastify";
import ReportsController from "../controllers/ReportsController";

export default async function reportsRoutes(server: FastifyInstance) {
  server.get(
    "/daily",
    { onRequest: [server.auth] },
    ReportsController.getDailySells
  );

  server.get(
    "/week",
    { onRequest: [server.auth] },
    ReportsController.getWeeklySells
  );

  server.get(
    "/month",
    { onRequest: [server.auth] },
    ReportsController.getMonthlySells
  );
}
