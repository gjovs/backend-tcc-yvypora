import { FastifyReply, FastifyRequest } from "fastify";
import { getDayOfWeek } from "../utils";
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

    const date = new Date();

    const dayOfWeek = getDayOfWeek(date.getDay());
    const hour = date.getHours();

    let hourStringify = hour.toString();

    if (hour < 10) {
      hourStringify = `0${hour}`;
    }

    const products = await SearchService.searchForProducts(q, {
      dayOfWeek,
      hour: hourStringify,
    });
    const marketers = await SearchService.searchForMarketers(q);
    const fairs = await SearchService.searchForFairs(q);

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
