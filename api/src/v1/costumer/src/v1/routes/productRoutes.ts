import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers";

export default async function productRoutes(server: FastifyInstance) {
  server.get(
    "/",
    {
      schema: {
        querystring: {
          type: "object",
          required: ["category", "score", "lowerPrice", "higherPrice"],
          properties: {
            category: { type: "number" },
            score: { type: "number" },
            lowerPrice: { type: "number" },
            higherPrice: { type: "number" },
            moreSales: { type: "number" },
          },
        },
      },
    },
    ProductController.index
  );
    
  server.get("/:id", ProductController.get);

  server.get("/inSaleOff", ProductController.inSaleOff);


  server.get("/findNearest", {onRequest: [server.auth]},ProductController.nearToClient)

  
}
