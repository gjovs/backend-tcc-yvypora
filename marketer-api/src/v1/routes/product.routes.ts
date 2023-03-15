import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z, ZodError } from 'zod';
import Product from '../service/product.service';
import FirebaseService from '../services/firebase.service';

export default async function productRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      onRequest: [server.auth],
    },
    async (req, rep) => {
      // @ts-ignore
      const { id } = req.user;
      const products = await Product.index(id);

      return rep.send({
        code: 200,
        error: false,
        data: products,
      });
    },
  );

  server.get(
    '/:id',
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
    async (
      req: FastifyRequest<{
        Params: {
          id: string;
        };
      }>,
      rep,
    ) => {
      // @ts-ignore
      const { id } = req.user;

      const res = await Product.get(parseInt(req.params.id, 10), id);

      if (res?.error) {
        return rep.status(res?.code as number).send({
          code: res.code,
          error: true,
          message: res?.message as string,
        });
      }

      return rep.send({
        code: 200,
        error: false,
        payload: res?.data,
      });
    },
  );

  server.post(
    '/',
    {
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
          ],
          properties: {
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
    async (
      req: FastifyRequest<{
        Body: {
          name: string;
          price: number;
          price_type: {
            id: number;
            name: string;
          };
          category: {
            name: string;
            id: number;
          };
          available_quantity: number;
        };
      }>,
      rep,
    ) => {
      const data = req.body;

      // @ts-ignore
      const res = await Product.create(data, req.user.id);

      if (res?.error) {
        return rep.status(res?.code as number).send({
          code: res?.code as number,
          error: true,
          message: res.message,
        });
      }

      return rep.send({
        code: 200,
        error: false,
        payload: res,
      });
    },
  );

  // add picture to product
  server.put(
    'picture/:id',
    {
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
    },
    async (
      req: FastifyRequest<{
        Params: {
          id: string;
        };
        Body: {
          picture: any;
        };
      }>,
      rep,
    ) => {
      const { picture } = req.body;

      await picture.toBuffer();

      const picture_uri = await FirebaseService.uploadImage(picture);

      const res = await Product.appendPicture(
        parseInt(req.params.id, 10),
        picture_uri,
      );

      if (res?.error) {
        // @ts-ignore
        return rep.status(res?.code).send({
          code: res.code,
          message: res.message,
          error: true,
        });
      }

      return rep.send({
        code: 200,
        error: false,
        message: res?.message,
      });
    },
  );

  server.delete(
    'picture/:id/',
    {
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
    async (
      req: FastifyRequest<{
        Params: {
          id: string;
          productId: string;
        };
      }>,
      rep,
    ) => {
      const res = await Product.removePicture(parseInt(req.params.id, 10));
      if (res?.error) {
        // @ts-ignore
        return rep.status(res?.code).send({
          code: res.code,
          message: res.message,
          error: true,
        });
      }

      return rep.send({
        code: 200,
        error: false,
        message: res?.message,
      });
    },
  );

  server.put(
    '/:id',
    {
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
    async (
      req: FastifyRequest<{
        Params: {
          id: string;
        };
      }>,
      rep,
    ) => {
      // @ts-ignore
      const { id } = req.user;

      const isSameOwner = await Product.checkOwner(
        id,
        parseInt(req.params.id, 10),
      );

      if (!isSameOwner) {
        return rep.status(401).send({
          error: true,
          code: 401,
          message:
            'this operation is not allowed because the owner token is not the same of the product owner',
        });
      }

      const updateProductSchema = z.object({
        name: z.string(),
        price: z.number(),
        price_type: z.object({
          id: z.number(),
          name: z.string(),
        }),

        category: z.object({
          name: z.string(),
          id: z.number(),
        }),

        available_quantity: z.number(),
      });

      try {
        const data = updateProductSchema.parse(req.body);
        const res = await Product.update(data, parseInt(req.params.id, 10));

        if (res?.error) {
          return rep.status(res?.code as number).send({
            code: res.code,
            error: true,
            message: res.message,
          });
        }

        return rep.send({
          code: 200,
          error: false,
          data: res?.data,
        });
      } catch (error) {
        if (error instanceof ZodError) {
          return rep.status(400).send({
            code: 400,
            error: true,
            message: error.message,
          });
        }
      }

      return false;
    },
  );

  server.delete(
    'disable/:id',
    {
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
    async (
      req: FastifyRequest<{
        Params: {
          id: string;
        };
      }>,
      rep,
    ) => {
      // @ts-ignore
      const { id } = req.user;
      const isSameOwner = await Product.checkOwner(
        id,
        parseInt(req.params.id, 10),
      );

      if (!isSameOwner) {
        return rep.status(401).send({
          error: true,
          code: 401,
          message:
            'this operation is not allowed because the owner token is not the same of the product owner',
        });
      }

      const res = await Product.disable(parseInt(req.params.id, 10));

      if (res?.error) {
        return rep.status(res.code).send({
          code: res.code,
          error: true,
          message: res.message,
        });
      }

      return rep.send({
        code: 200,
        error: false,
        message: res?.message,
      });
    },
  );

  server.put(
    'enable/:id',
    {
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
    async (
      req: FastifyRequest<{
        Params: {
          id: string;
        };
      }>,
      rep,
    ) => {
      // @ts-ignore
      const { id } = req.user;

      const isSameOwner = await Product.checkOwner(
        id,
        parseInt(req.params.id, 10),
      );

      if (!isSameOwner) {
        return rep.status(401).send({
          error: true,
          code: 401,
          message:
            'this operation is not allowed because the owner token is not the same of the product owner',
        });
      }

      const res = await Product.enable(parseInt(req.params.id, 10));

      if (res?.error) {
        return rep.status(res.code).send({
          code: res.code,
          error: true,
          message: res.message,
        });
      }

      return rep.send({
        code: 200,
        error: false,
        message: res?.message,
      });
    },
  );

  server.put(
    'sale_off/:id',
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
    async (
      req: FastifyRequest<{
        Params: {
          id: string;
        };
        Querystring: {
          value: string;
        };
      }>,
      rep,
    ) => {
      // @ts-ignore
      const { id } = req.user;
      const productId = parseInt(req.params.id, 10);
      const value = parseFloat(req.query.value);

      const isSameOwner = await Product.checkOwner(
        id,
        parseInt(req.params.id, 10),
      );

      if (!isSameOwner) {
        return rep.status(401).send({
          error: true,
          code: 401,
          message:
            'this operation is not allowed because the owner token is not the same of the product owner',
        });
      }

      const res = await Product.addSaleOff(id, productId, value);

      return rep.status(res.code).send({
        code: res.code,
        error: res.error,
        message: res.message,
      });
    },
  );

  server.delete(
    'sale_off/:id',
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
    async (
      req: FastifyRequest<{
        Params: {
          id: string;
        };
      }>,
      rep,
    ) => {
      // @ts-ignore
      const { id } = req.user;
      const productId = parseInt(req.params.id, 10);

      const isSameOwner = await Product.checkOwner(
        id,
        parseInt(req.params.id, 10),
      );

      if (!isSameOwner) {
        return rep.status(401).send({
          error: true,
          code: 401,
          message:
            'this operation is not allowed because the owner token is not the same of the product owner',
        });
      }

      const res = await Product.removeSaleOff(id, productId);

      return rep.status(res.code).send({
        code: res.code,
        error: res.error,
        message: res.message,
      });
    },
  );
}
