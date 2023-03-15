import { FastifyInstance, FastifyRequest } from 'fastify';
import axios from 'axios';
import Marketer from '../service/marketer.service';
import IAddress from '../utils/interfaces/address.interface';
import Fair from '../service/fair.service';

export default async function fairRoutes(server: FastifyInstance) {
  // ADD FAIRS
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

      const res = await Marketer.addFair(id, parseInt(req.params.id, 10));

      if (res?.error) {
        // @ts-ignore
        return rep.status(res?.code).send({
          error: true,
          cause: 'Bad id or this relation already exist!',
        });
      }

      return rep.send({
        code: 200,
        payload: res?.data,
        error: false,
      });
    },
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

      const res = await Marketer.removeFair(id, parseInt(req.params.id, 10));

      if (res?.error) {
        // @ts-ignore
        return rep.status(res?.code).send({
          error: true,
          cause: res.message,
        });
      }

      return rep.send({
        code: 200,
        payload: res?.message,
        error: false,
      });
    },
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
    async (
      req: FastifyRequest<{
        Body: {
          dateAndHourOfWork: {
            open: string;
            close: string;
            dayOfWeek: {
              name: string;
              id: number;
            };
          }[];

          address: {
            cep: string;
            complemento: string;
            addressTypeId: number;
            number: number;
            city: string;
            uf: string;
            neighborhood: string;
            logradouro: string;
          };
        };
      }>,
      rep,
    ) => {
      const { dateAndHourOfWork, address } = req.body;

      const check = await Fair.getByCep(address.cep);

      if (check.length > 0) {
        return rep.status(401).send({
          code: 401,
          error: true,
          message: 'We already have this fair in this CEP value',
        });
      }

      dateAndHourOfWork.forEach((date) => {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        date.close = new Date(`1900-01-01T${date.close}.000Z`);
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        date.open = new Date(`1900-01-01T${date.open}.000Z`);
      });

      // @ts-ignore
      const addressObject: IAddress = {
        city: address.city,
        cep: address.cep,
        complemento: address.complemento,
        neighborhood: address.neighborhood,
        uf: address.uf,
        number: address.number,
        logradouro: address.logradouro,
      };

      try {
        const addressToSearch = `${address.city}, ${
          address.uf
        }, ${address.logradouro.replace(' ', '+')}`;
        console.log(
          `https://nominatim.openstreetmap.org/search?country=Brazil&q=${addressToSearch}&format=json&limit=1`,
        );
        const latAndLonRes: {
          data: [
            {
              lat: string;
              lon: string;
            },
          ];
        } = await axios.get(
          `https://nominatim.openstreetmap.org/search?country=Brazil&q=${addressToSearch}&format=json&limit=1`,
        );

        console.log(latAndLonRes.data);

        addressObject.latitude = parseFloat(latAndLonRes.data[0].lat);
        addressObject.longitude = parseFloat(latAndLonRes.data[0].lon);
        console.log(addressObject);
      } catch (e) {
        console.log(e);
        return rep.code(400).send({
          error: true,
          message: 'This CEP value cant be search, probably is wrong!',
        });
      }

      if (!dateAndHourOfWork.length) {
        return rep.status(400).send({
          code: 400,
          error: true,
          message:
            'It is required some date and hour of work to save a new fair in the database',
        });
      }
      const data = { address: addressObject, dateAndHourOfWork };

      const res = await Fair.create(data);

      return res;
    },
  );
}
