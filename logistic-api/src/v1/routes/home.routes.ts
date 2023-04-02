import { FastifyInstance } from "fastify";
import { StatusController } from "../controllers";

export default async function (server: FastifyInstance) {
  // connect to be online
  server.get(
    "/",
    { websocket: true, onRequest: [server.auth] },
    StatusController.handleOnlineStatus
  );
}
