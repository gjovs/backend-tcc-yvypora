import { FastifyReply, FastifyRequest } from 'fastify';
import { z, ZodError } from 'zod';
import { Product } from '../services';

export class ProductController {
  async get(
    req: FastifyRequest<{
             Params: {
                 id: string;
             };
         }>,
    rep: FastifyReply,
  ) {
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
  }

  async index(req: FastifyRequest, rep: FastifyReply) {
    // @ts-ignore
    const { id } = req.user;
    const products = await Product.index(id);

    return rep.send({
      code: 200,
      error: false,
      data: products,
    });
  }

  async create(
    req: FastifyRequest<{
        Body: {
            description: string
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
            quantity: number;
            available_quantity: number;
        };
    }>,
    rep: FastifyReply,
  ) {
    const data = req.body;

    console.log(data);
    

    if (data.quantity) {
      // DIVIDE PRICE BY EACH QUILOGRAMS IN QUANTITY
      data.price = data.price / data.quantity   
      
      console.log(data.price, data.quantity);
    }

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
  }

  async update(
    req: FastifyRequest<{
        Params: {
            id: string;
        };
    }>,
    rep: FastifyReply,
  ) {
    // @ts-ignore
    const { id } = req.user;

    const updateProductSchema = z.object({
      name: z.string(),
      price: z.number(),
      price_type: z.object({
        id: z.number(),
        name: z.string(),
      }),
      description: z.string(),
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
  }

  async disable(
    req: FastifyRequest<{ Params: { id: string; } }>,
    rep: FastifyReply,
  ) {
    // @ts-ignore
    const { id } = req.user;
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
  }

  async enable(
    req: FastifyRequest<{
                   Params: {
                       id: string;
                   };
               }>,
    rep: FastifyReply,
  ) {
    // @ts-ignore
    const { id } = req.user;

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
  }
}

export default new ProductController();
