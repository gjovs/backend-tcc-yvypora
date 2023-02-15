import { FastifyInstance, FastifyRequest } from 'fastify';
import { Costumer } from '../models';

export default async function registerPlugin(server: FastifyInstance) {
  server.post('/costumer', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'password', 'address'],
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          gender: {
            type: 'string',
          },
          address: {
            type: 'object',
            required: ['cep', 'number', 'complemento', 'addressTypeId'],
            properties: {
              cep: {
                type: 'number',
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
            },
          },
        },
      },
    },
  }, async (req: FastifyRequest<{
      Body: {
        password: string,
        name: string,
        email: string,
        gender: string,
        address: {
          cep: number,
          complemento: string,
          addressTypeId: number,
          number: number
        }
      }
  }>, rep) => {
    const { body } = req;
    const {
      name, email, password, address, gender,
    } = body;

    // male Default
    let genderId = 1;

    // female id
    if (gender.toUpperCase() === 'F') genderId = 2;

    const res = await Costumer.createCostumer({
      name, email, password, address, gender: genderId,
    });

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.data);
  });
}

// register/costumer-->
// register/deliveryman-->
// register/marketer-->
