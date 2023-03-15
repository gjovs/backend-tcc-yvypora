import { FastifyInstance } from 'fastify';
import { FairController, MarketerController } from '../controllers';

export default async function fairRoutes(server: FastifyInstance) {
  server.put(
    '/add/:id',
    {
      onRequest: [server.auth],
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number' },
          },
        },
      },
    },
    MarketerController.addFair,
  );

  // REMOVE FAIRS
  server.delete(
    '/remove/:id',
    {
      onRequest: [server.auth],
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number' },
          },
        },
      },
    },
    MarketerController.removeFair,
  );

  // CREATE
  server.post(
    '/',
    {
      onRequest: [server.auth],
      schema: {
        body: {
          type: 'object',
          required: ['dateAndHourOfWork', 'address'],
          properties: {
            dateAndHourOfWork: {
              type: 'array',
              maxItems: 7,
              items: {
                type: 'object',
                required: ['open', 'close', 'dayOfWeek'],
                properties: {
                  open: {
                    type: 'string',
                  },
                  close: {
                    type: 'string',
                  },
                  dayOfWeek: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      name: { type: 'string' },
                    },
                  },
                },
              },
            },
            address: {
              type: 'object',
              required: [
                'cep',
                'number',
                'complemento',
                'addressTypeId',
                'city',
                'uf',
                'neighborhood',
                'logradouro',
              ],
              properties: {
                cep: {
                  type: 'string',
                },
                number: {
                  type: 'number',
                },
                complemento: {
                  type: 'string',
                },
                addressTypeId: {
                  type: 'number',
                },
                city: {
                  type: 'string',
                },
                logradouro: {
                  type: 'string',
                },
                uf: {
                  type: 'string',
                },
                neighborhood: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    FairController.create,
  );
}
