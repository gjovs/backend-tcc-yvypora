import { FastifyInstance, FastifyRequest } from 'fastify';
import { orderByDistance } from 'geolib';

export default async function fairPlugin(server: FastifyInstance) {
  server.get('/fair', {
    // @ts-ignore
    onRequest: [server.auth],
    schema: {
      querystring: {
        type: 'object',
        required: ['lat', 'long'],
        properties: {
          lat: { type: 'string' },
          long: { type: 'string' },
        },
      },
    },
  }, async (req: FastifyRequest<{
    Querystring: {
      lat: string,
      long: string,
    }
  }>, rep) => {
    const MOCKED_DATA = [{
      name: 'Feira Livre Osasco',
      latitude: -23.516820,
      longitude: -46.795530,
    }, {
      name: 'Feira Livre Osasco - 2',
      latitude: -23.510340,
      longitude: -46.776031,
    }, {
      name: 'Feira Livre Osasco - 3',
      latitude: -23.537410,
      longitude: -46.783970,
    }];

    const { lat, long } = req.query;

    const originLat = parseFloat(lat);
    const originLong = parseFloat(long);

    const nearPositions = orderByDistance({
      latitude: originLat,
      longitude: originLong,
    }, MOCKED_DATA);

    return rep.status(200).send({
      code: 200,
      payload: nearPositions,
      error: false,
    });
  });
}
