import { FastifyInstance } from 'fastify';
import { FairController, MarketerController, PictureController } from '../controllers';

export default async function fairRoutes(server: FastifyInstance) {
  server.put('picture/:id', {

    // @ts-ignore
    onRequest: [server.auth],
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: 'number',
          },
        },
      },
      body: {
        type: 'object',
        required: ['picture'],
        properties: {
          picture: {
            type: 'object',
          },
        },
      },
    },
  }, PictureController.addInFair);
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
      // @ts-ignore
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
    {// @ts-ignore
      onRequest: [server.auth],
      schema: {
        body: {
          type: 'object',
          required: ['dateAndHourOfWork', 'address', 'name'],
          properties: {
            name: { type: 'string' },
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
                  minLength: 8,
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
