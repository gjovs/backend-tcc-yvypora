import { FastifyReply, FastifyRequest } from 'fastify';
import ProductService from '../services/product.service';
import {getDayOfWeek} from "../utils";

export class ProductController {
  async search(req: FastifyRequest<{
    Querystring: {
      q: string
    }
  }>, rep: FastifyReply) {
    let day_of_search: string = ''

    const date = new Date();

    const { q } = req.query;

    const day = date.getDay();

    const dayOfSearch = getDayOfWeek(day)

    const hour = date.getHours()

    const res = await ProductService.search(q, {
      hour,
      dayOfWeek: dayOfSearch
    });

    return rep.status(200).send({
      code: 200,
      error: false,
      data: res,
    });
  }

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
}

export default new ProductController();
