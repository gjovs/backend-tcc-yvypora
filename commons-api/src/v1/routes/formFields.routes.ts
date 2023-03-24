import { FastifyInstance, FastifyRequest } from 'fastify';
import { FormFieldsController } from '../controllers';

export default async function formFieldsRoutes(server: FastifyInstance) {
  server.get('/costumer', FormFieldsController.forCostumer);

  server.get('/marketer', {
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
  }, FormFieldsController.forMarketer);

  server.get('/deliveryman', FormFieldsController.forDeliveryman);

  server.get(
    '/fairs',
    {
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
    },
    FormFieldsController.listCloseFairs,
  );
}
