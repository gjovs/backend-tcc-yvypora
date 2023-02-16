import { FastifyInstance, FastifyRequest } from 'fastify';
import bcryptjs from 'bcryptjs';
import { Costumer, Marketer } from '../models';

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

    const password_hash = await bcryptjs.hash(password, 6);

    const res = await Costumer.createCostumer({
      name, email, password: password_hash, address, gender: genderId,
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

  server.post('/marketer', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'password', 'location', 'gender', 'phone'],
        properties: {
          name: { type: 'string' },
          cpf: { type: 'string' },
          cnpj: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          phone: { type: 'string' },
          gender: { type: 'string' },
          location: {
            type: 'object',
            properties: {
              latitude: { type: 'number' },
              longitude: { type: 'number' },
            },
          },
        },
      },
    },
  }, async (req: FastifyRequest<{
    Body: {
      name: string,
      cnpj: string,
      cpf: string,
      email: string,
      password: string,
      phone: string,
      location: {
        longitude: number,
        latitude: number
      },
      gender: string,
    }
  }>, rep) => {
    const {
      cpf, cnpj, gender, email, name, password, location, phone,
    } = req.body;

    if (!cnpj && !cpf) {
      return rep.status(401).send({
        error: true,
        message: ['It is required one field of identification (CPF or CNPJ)'],
        code: 401,
      });
    }

    const password_hash = await bcryptjs.hash(password, 6);

    // male Default
    let genderId = 1;

    // female id
    if (gender.toUpperCase() === 'F') genderId = 2;

    const data = {
      location,
      email,
      name,
      password_hash,
      phone,
      genderId,
    };

    const res = await Marketer.createMarketer(data);

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
