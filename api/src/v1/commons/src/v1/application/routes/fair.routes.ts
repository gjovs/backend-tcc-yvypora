import { FastifyInstance } from "fastify";
import { FairController } from "../controllers";
import { locationSchema } from "../../infrastructure/http/schemas/location.schema";

export default async function fairRoutes(server: FastifyInstance) {
  server.get(
    "/listByClose",
    {
      schema: locationSchema,
    },
    FairController.listByClose
  );
}
