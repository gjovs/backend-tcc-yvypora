import { FastifyReply, FastifyRequest } from 'fastify';
import { orderByDistance } from 'geolib';
import FairRepository from '../services/fair.repository'; 

export class FairController {
  async index(req: FastifyRequest<{
    Querystring: {
      lat: string,
      long: string
    }
  }>, rep: FastifyReply) {
    const fairs = await FairRepository.index();

    const { lat, long } = req.query;

    const originLat = parseFloat(lat);
    const originLong = parseFloat(long);

    const nearPositions = orderByDistance({
      latitude: originLat,
      longitude: originLong,
    }, fairs as any);

    return rep.send({
      code: 200,
      data: nearPositions,
      error: false,
    });
  }

  async get(req:FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply) {
    const { id } = req.params;

    const res = await FairRepository.get(parseInt(id, 10));

    if (!res) {
      return rep.status(404).send({
        code: 404,
        message: 'Bad ID, this fair does not exist',
        error: false,
      });
    }

    return rep.send({
      code: 200,
      data: res,
      error: false,
    });
  }
}

export default new FairController();
