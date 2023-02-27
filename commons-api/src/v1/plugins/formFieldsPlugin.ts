import
{ FastifyInstance, FastifyRequest } from 'fastify';
import * as querystring from 'querystring';
import { orderByDistance } from 'geolib';
import { Fair, FormFields } from '../models';

export default async function formFieldsPlugin(server: FastifyInstance) {
  server.get('/costumer', async (_req, rep) => {
    const genders = await FormFields.indexGender();
    const paymentMethods = await FormFields.indexPaymentMethods();

    return rep.send({
      code: 200,
      payload: [{
        genders,
        paymentMethods,
      }],
      error: false,
    });
  });

  server.get('/marketer', async (_req, rep) => {
    const genders = await FormFields.indexGender();

    return rep.send({
      code: 200,
      payload: [{
        genders,
      }],
      error: false,
    });
  });

  server.get('/deliveryman', async (_req, rep) => {
    const genders = await FormFields.indexGender();
    const veicules = await FormFields.indexTypeOfVeicules();

    return rep.send({
      code: 200,
      payload: [{
        genders,
        veicules,
      }],
      error: false,
    });
  });

  server.get('/fairs', {
    schema: {
      querystring: {
        type: 'object',
        required: ['lat', 'long'],
        lat: { type: 'number' },
        long: { type: 'number' },
      },
    },
  }, async (req: FastifyRequest<{
    Querystring: {
        lat: number,
        long: number
    }
  }>, rep) => {
    const { lat, long } = req.query;

    const fairs = await Fair.index();

    const orderedFairs = orderByDistance({ latitude: lat, longitude: long }, fairs as any);

    return rep.send({
      code: 200,
      payload: [{
        fairs: orderedFairs,
      }],
      error: false,
    });
  });
}
