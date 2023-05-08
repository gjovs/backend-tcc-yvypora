import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z, ZodError } from 'zod';
import {
  PictureController,
  ProductController,
  SaleOffController,
} from '../controllers';

export default async function productRoutes(server: FastifyInstance) {
  // @ts-ignore
  server.get('/', { onRequest: [server.auth] }, ProductController.index);

  server.get(
    '/:id',
    { // @ts-ignore
      onRequest: [server.auth, server.checkOwner],
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
    ProductController.get,
  );

  server.post(
    '/',
    { // @ts-ignore
      onRequest: [server.auth],
      schema: {
        body: {
          type: 'object',
          required: [
            'name',
            'price',
            'price_type',
            'category',
            'available_quantity',
            'description',
          ],
          properties: {
            description: { type: 'string' },
            name: { type: 'string' },
            price: { type: 'number' },
            available_quantity: { type: 'number' },
            price_type: {
              type: 'object',
              required: ['name', 'id'],
              properties: {
                id: {
                  type: 'number',
                },
                name: {
                  type: 'string',
                },
              },
            },
            category: {
              type: 'object',
              required: ['name', 'id'],
              properties: {
                name: { type: 'string' },
                id: { type: 'number' },
              },
            },
          },
        },
      },
    },
    ProductController.create,
  );

  // add picture to product
  server.put(
    'picture/:id',
    {
      // @ts-ignore
      onRequest: [server.auth, server.checkOwner],
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
    },
    PictureController.addInProduct,
  );

  server.delete(
    'picture/:id/:pictureId',
    {
      // @ts-ignore
      onRequest: [server.auth, server.checkOwner],
      schema: {
        params: {
          type: 'object',
          required: ['id', 'pictureId'],
          properties: {
            id: {
              type: 'number',
            },
            pictureId: {
              type: 'number',
            },
          },
        },
      },
    },
    PictureController.delete,
  );

  server.put(
    '/:id',
    {
      // @ts-ignore
      onRequest: [server.auth, server.checkOwner],
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
      },
    },
    ProductController.update,
  );

  server.delete(
    'disable/:id',
    {
      // @ts-ignore
      onRequest: [server.auth, server.checkOwner],
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
      },
    },
    ProductController.disable,
  );

  server.put(
    'enable/:id',
    {
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
      },
    },
    ProductController.enable,
  );

  server.put(
    'sale_off/:id',
    {
      // @ts-ignore
      onRequest: [server.auth, server.checkOwner],
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number' },
          },
        },
        querystring: {
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              type: 'number',
            },
          },
        },
      },
    },
    SaleOffController.create,
  );

  server.delete(
    'sale_off/:id',
    {
      // @ts-ignore
      onRequest: [server.auth, server.checkOwner],
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
    SaleOffController.delete,
  );
}
