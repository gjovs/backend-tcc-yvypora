import { FastifyReply, FastifyRequest } from "fastify";
import SearchRepository from "../services/search.repository";
import SearchService from "../services/search.service";

class SearchController {
  async search(
    req: FastifyRequest<{
      Querystring: {
        q: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { q } = req.query;

    const { hour, dayOfWeek } = SearchService.getDateOfTheSearch()

    const products = await SearchRepository.searchForProducts(q, {
      dayOfWeek,
      hour,
    });

    const marketers = await SearchRepository.searchForMarketers(q);
    const fairs = await SearchRepository.searchForFairs(q);

    const searchs = {
      fairs,
      marketers,
      products,
    };

    return rep.send({
      code: 200,
      error: false,
      data: searchs,
    });
  }
}

export default new SearchController();
