import { FastifyInstance, FastifyRequest } from 'fastify';
import { orderByDistance } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types';
import { Fair } from '../services';
import { FairController } from '../controllers';

export default async function fairRoutes(server: FastifyInstance) {
  server.get('/listByClose', {
    schema: {
      querystring: {
        type: 'object',
        required: ['latitude', 'longitude'],
        properties: {
          latitude: { type: 'string' },
          longitude: { type: 'string' },
        },
      },
    },
  }, FairController.listByClose);
}
