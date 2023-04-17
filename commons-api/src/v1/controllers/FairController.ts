import { FastifyReply, FastifyRequest } from 'fastify';
import { orderByDistance } from 'geolib';
import { Fair } from '../services';

export class FairController {
  async listByClose(req: FastifyRequest<{
    Querystring: {
      latitude: string,
      longitude: string,
    }
  }>, rep: FastifyReply) {
    const fairs = await Fair.index();

    const { latitude, longitude } = req.query;

    const originLat = parseFloat(latitude);
    const originLong = parseFloat(longitude);

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
