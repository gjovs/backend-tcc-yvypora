import { FastifyReply, FastifyRequest } from 'fastify';
import ProductService from '../services/product.service';
import { getDayOfWeek } from '../utils';

export class ProductController {
  async index(
    req: FastifyRequest<{
      Querystring: {
        category: string;
        score: string;
        lowerPrice: string;
        higherPrice: string;
        moreSales: string | undefined;
      };
    }>,
    rep: FastifyReply
  ) {
    const { category, score, lowerPrice, higherPrice, moreSales } = req.query;

    if (moreSales) {
      const res = await ProductService.moreSales(parseInt(moreSales, 10));
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

    const res = await ProductService.filteredByPriceAndScoreAndCategory(
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

  async get(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const product = await ProductService.get(parseInt(id, 10));

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

  async inSaleOff(_req: FastifyRequest, rep: FastifyReply) {
    const res = await ProductService.inSaleOff();

    const data = res.map(({ product }) => ({ ...product, promo: true }));

    return rep.send({
      code: 200,
      error: false,
      data,
    });
  }

  async nearToClient(req: FastifyRequest, rep: FastifyReply) {
    // @ts-ignore
    const { id } = req.user as DecodedToken;

    const res = await ProductService.findNearest(id);

    return rep.send({
      code: 200,
      error: false,
      data: res,
    });
  }
}

export default new ProductController();