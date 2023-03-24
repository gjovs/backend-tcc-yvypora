import { FastifyReply, FastifyRequest } from 'fastify';
import { orderByDistance } from 'geolib';
import { Fair } from '../services';

export class FairController {
  async listByClose(req: FastifyRequest<{
    Querystring: {
      lat: string,
      long: string,
    }
  }>, rep: FastifyReply) {
    const fairs = await Fair.index();

    const { lat, long } = req.query;

    const originLat = parseFloat(lat);
    const originLong = parseFloat(long);

    const nearPositions = orderByDistance({
      latitude: originLat,
      longitude: originLong,
    }, fairs as any);

    return rep.status(200).send({
      code: 200,
      payload: nearPositions,
      error: false,
    });
  }
}

export default new FairController();
