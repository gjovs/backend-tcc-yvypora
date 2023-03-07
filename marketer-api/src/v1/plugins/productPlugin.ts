import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import Product from '../model/Product';
import { z } from 'zod';
import FirebaseService from '../services/firebase.service';
import { ZodError } from 'zod/lib';

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
      // @ts-ignore
      onRequest: [server.auth],
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
    },
    Body: {
      picture: any
    }
  }>, rep) => {

    const { picture } = req.body;

    await picture.toBuffer()

    const picture_uri = await FirebaseService.uploadImage(picture);


    const res = await Product.appendPicture(parseInt(req.params.id), picture_uri)

    if (res?.error) {
      //@ts-ignore
      return rep.status(res?.code).send({
        code: res.code,
        message: res.message,
        error: true
      })
    }


    return rep.send({
      code: 200,
      error: false,
      message: res?.message
    })
  });

  server.delete('picture/:id/', {
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
  }, async (req: FastifyRequest<{
    Params: {
      id: string,
      productId: string
    }
  }>, rep) => {
    const res = await Product.removePicture(parseInt(req.params.id, 10))
    if (res?.error) {
      //@ts-ignore
      return rep.status(res?.code).send({
        code: res.code,
        message: res.message,
        error: true
      })
    }


    return rep.send({
      code: 200,
      error: false,
      message: res?.message
    })
  })



  server.put("/:id", {
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
  }, async (req: FastifyRequest<{
    Params: {
      id: string
    }
  }>, rep) => {
    const updateProductSchema = z.object({
      name: z.string(),
      price: z.number(),
      price_type: z.object({
        id: z.number(),
        name: z.string()
      }),

      category: z.object({
        name: z.string(),
        id: z.number()
      }),

      available_quantity: z.number()
    })

    try {
      const data = updateProductSchema.parse(req.body)
      const res = await Product.update(data, parseInt(req.params.id, 10))

      if (res?.error) {
        return rep.status(res?.code as number).send({
          code: res.code,
          error: true,
          message: res.message
        })
      }

      return rep.send({
        code: 200,
        error: false,
        data: res?.data
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return rep.status(400).send({
          code: 400,
          error: true,
          message: error.message
        })
      }
    }
  })

  server.delete('disable/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: "number"
          }
        }
      }
    }
  }, async (req: FastifyRequest<{
    Params: {
      id: string
    }
  }>, rep) => {
    const { id } = req.params
    const res = await Product.disable(parseInt(id, 10))

    if (res?.error) {
      return rep.status(res.code).send({
        code: res.code,
        error: true,
        message: res.message
      })
    }

    return rep.send({
      code: 200,
      error: false,
      message: res?.message
    })
  })

  server.put('enable/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: "number"
          }
        }
      }
    }
  }, async (req: FastifyRequest<{
    Params: {
      id: string
    }
  }>, rep) => {
    const { id } = req.params
    const res = await Product.enable(parseInt(id, 10))

    if (res?.error) {
      return rep.status(res.code).send({
        code: res.code,
        error: true,
        message: res.message
      })
    }

    return rep.send({
      code: 200,
      error: false,
      message: res?.message
    })
  })

}