import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import Product from '../model/Product';
import Marketer from '../model/Marketer';

interface IProduct {
  name: string
  price: number,
  price_type: {
    id: number,
    name: string
  }
  category: {
    name: string,
    id: number
  },
  available_quantity: number
}
export default async function productPlugin(server: FastifyInstance) {
  server.post('/', {

    // @ts-ignore
    onRequest: [server.auth],
    schema: {
      body: {
        type: 'object',
        required: ['name', 'price', 'price_type', 'category', 'available_quantity'],
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
  }, async (req: FastifyRequest<{
      Body: IProduct
    }>, rep) => {
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
  });

  // add picture to product
  server.put('picture/:id', {
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
  }, async (req: FastifyRequest<{
    Params: {
      id: string
    }
  }>, rep) => {
    const marketerExists = await Marketer.get(parseInt(req.params.id, 10));

    if (!marketerExists) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: 'bad id, this id is not associated with any marketer in database',
      });
    }

    const { picture } = req.body;

    // TODO APPEND FIREBASE SERVICE
  });

  // remove
  server.delete('picture/:id');

  server.put('/:id', {
    // @ts-ignore
    onRequest: [server.auth],
    schema: {},

  }, (req, rep) => {

  });
}
