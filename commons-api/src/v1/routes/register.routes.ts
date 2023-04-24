import { FastifyInstance, FastifyRequest } from 'fastify';
import { log } from 'util';
import { Costumer, Marketer } from '../services';
import { hashPassword, isValidDate } from '../utils/utils';
import { AddressController, CostumerController, MarketerController } from '../controllers';

export default async function registerRoutes(server: FastifyInstance) {
  server.post(
    '/costumer',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'email', 'password', 'address', 'birthday'],
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
            birthday: {
              type: 'string',
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
    CostumerController.create,
  );

  // update costumer
  server.put(
    '/costumer/:id',
    {
      schema: {
        body: {
          type: 'object',
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
            cpf: {
              type: 'string',
            },
            birthday: {
              type: 'string',
            },
          },
        },
      },
    },
    CostumerController.update,
  );

  server.delete(
    '/costumer/:id',
    CostumerController.delete,
  );

  server.put(
    '/costumer/address/:id',
    {
      schema: {
        body: {
          type: 'object',
          required: ['address'],
          properties: {
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
    AddressController.addToCostumer,
  );

  server.delete(
    '/costumer/address/:id',
    AddressController.removeToCostumer,
  );

  server.post(
    '/marketer',
    {
      schema: {
        body: {
          type: 'object',
          required: [
            'name',
            'email',
            'password',
            'location',
            'gender',
            'phone',
            'birthday',
          ],
          properties: {
            name: { type: 'string' },
            cpf: { type: 'string' },
            cnpj: { type: 'string' },
            birthday: { type: 'string' },
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
    },
    MarketerController.create,
  );

  server.delete(
    '/marketer/:id',
    MarketerController.delete,
  );

  server.put(
    '/marketer/:id',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            cpf: { type: 'string' },
            cnpj: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            gender: { type: 'string' },
            birthday: { type: 'string' },
          },
        },
      },
    },
    MarketerController.update,
  );
}
