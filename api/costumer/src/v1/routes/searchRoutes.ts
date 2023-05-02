import { FastifyInstance } from "fastify";
import SearchController from "../controllers/SearchController";

export default async function searchRoutes(server: FastifyInstance) {
  server.get(
    "/",
    {
      schema: {
        querystring: {
          type: "object",
          required: ["q"],
          properties: {
            q: { type: "string" },
          },
        },
      },
    },
    SearchController.search
  );
}
