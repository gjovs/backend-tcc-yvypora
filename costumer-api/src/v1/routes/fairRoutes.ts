import { FastifyInstance, FastifyRequest } from 'fastify';
import { orderByDistance } from 'geolib';
import Fair from '../services/fair.service';
import { FairController } from '../controllers';

export default async function fairRoutes(server: FastifyInstance) {
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
  }, FairController.index);

  server.get('/:id', FairController.get);
}
