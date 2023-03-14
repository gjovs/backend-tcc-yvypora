import { FastifyInstance, FastifyRequest } from "fastify";
import Product from "../models/Product";

export default async function productPlugin(server: FastifyInstance) {
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
    async (
      req: FastifyRequest<{
        Querystring: {
          category: string;
          score: string;
          lowerPrice: string;
          higherPrice: string;
          moreSales: string | undefined;
        };
      }>,
      rep
    ) => {
      const { category, score, lowerPrice, higherPrice, moreSales } = req.query;

      if (moreSales) {
        const res = await Product.moreSales(parseInt(moreSales, 10));
        return rep.send({
          code: 200,
          error: false,
          data: res,
        });
      }

      if (parseFloat(lowerPrice) > parseFloat(higherPrice)) {
        return rep.status(400).send({
          code: 400,
          error: true,
          message:
            "Bad request, the lower price value is higher than the higher price value",
        });
      }

      const res = await Product.filteredByPriceAndScoreAndCategory(
        parseInt(category, 10),
        parseFloat(score),
        parseFloat(lowerPrice),
        parseFloat(higherPrice)
      );

      return rep.send({
        code: 200,
        error: false,
        data: res,
      });
    }
  );

  server.get(
    "/:id",
    async (
      req: FastifyRequest<{
        Params: {
          id: string;
        };
      }>,
      rep
    ) => {
      const { id } = req.params;

      const product = await Product.get(parseInt(id, 10));

      if (!product) {
        return rep.status(404).send({
          code: 404,
          erro: true,
          message: "Content not found, check the id",
        });
      }

      return rep.send({
        code: 200,
        error: false,
        data: product,
      });
    }
  );
}
