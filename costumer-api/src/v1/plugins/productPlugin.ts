import { FastifyInstance, FastifyRequest } from 'fastify';
import Product from '../models/Product';

export default async function (server: FastifyInstance) {
  server.get('/', {
    schema: {
      querystring: {
        type: 'object',
        required: ['category', 'score', 'lowerPrice', 'higherPrice'],
        properties: {
          category: { type: 'number' },
          score: { type: 'number' },
          lowerPrice: { type: 'number' },
          higherPrice: { type: 'number' },
        },
      },
    },
  }, async (req: FastifyRequest<{
    Querystring: {
      category: string,
      score: string,
      lowerPrice: string,
      higherPrice: string
    }
  }>, rep) => {
    const {
      category, score, lowerPrice, higherPrice,
    } = req.query;

    if (parseFloat(lowerPrice) > parseFloat(higherPrice)) {
      return rep.status(400).send({
        code: 400,
        error: true,
        message: 'Bad request, the lower price value is higher than the higher price value',
      });
    }

    const res = await Product.filteredByPriceAndScoreAndCategory(
      parseInt(category, 10),
      parseFloat(score),
      parseFloat(lowerPrice),
      parseFloat(higherPrice),
    );

    return rep.send({
      code: 200,
      error: false,
      data: res,
    });
  });
}
