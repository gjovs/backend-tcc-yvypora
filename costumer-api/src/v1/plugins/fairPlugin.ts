import { FastifyInstance, FastifyRequest } from 'fastify';
import { orderByDistance } from 'geolib';
import Fair from '../models/Fair';

export default async function fairPlugin(server: FastifyInstance) {
  server.get('/moreSold', (_req, rep) => {

  });

  server.get('/', {
    schema: {
      querystring: {
        type: 'object',
        required: ['lat', 'long'],
        properties: {
          lat: { type: 'number' },
          long: { type: 'number' },
        },
      },
    },
  }, async (req: FastifyRequest<{
    Querystring: {
      lat: string,
      long: string
    }
  }>, rep) => {
    const fairs = await Fair.index();

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
  });

  server.get('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, rep) => {
    const { id } = req.params;

    const res = await Fair.get(parseInt(id, 10));

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
  });
}
