import { FastifyInstance } from "fastify";
import ReportsController from "../controllers/ReportsController";

export default async function reportsRoutes(server: FastifyInstance) {
  server.get(
    "/daily",
    // @ts-ignore
    { onRequest: [server.auth] },
    ReportsController.getDailySells
  );

  server.get(
    "/week",
    // @ts-ignore
    { onRequest: [server.auth] },
    ReportsController.getWeeklySells
  );

  server.get(
    "/month",
    // @ts-ignore
    { onRequest: [server.auth] },
    ReportsController.getMonthlySells
  );
}
