import { FastifyReply, FastifyRequest } from 'fastify';
import Product from '../services/product.service';

export class ProductController {
  async index(req: FastifyRequest<{
    Querystring: {
      category: string;
      score: string;
      lowerPrice: string;
      higherPrice: string;
      moreSales: string | undefined;
    };
  }>, rep: FastifyReply) {
    const {
      category, score, lowerPrice, higherPrice, moreSales,
    } = req.query;

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
          'Bad request, the lower price value is higher than the higher price value',
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
  }

  async get(req: FastifyRequest<{
    Params: {
      id: string;
    };
  }>, rep: FastifyReply) {
    const { id } = req.params;

    const product = await Product.get(parseInt(id, 10));

    if (!product) {
      return rep.status(404).send({
        code: 404,
        erro: true,
        message: 'Content not found, check the id',
      });
    }

    return rep.send({
      code: 200,
      error: false,
      data: product,
    });
  }
}

export default new ProductController();
