import { FastifyReply, FastifyRequest } from 'fastify';
import { orderByDistance } from 'geolib';
import { Fair, FormFields } from '../services';

export class FormFieldsController {
  async forCostumer(_req: FastifyRequest, rep: FastifyReply) {
    const genders = await FormFields.indexGender();
    const paymentMethods = await FormFields.indexPaymentMethods();
    const typesOfAddress = await FormFields.indexTypeOfAddress();

    return rep.send({
      code: 200,
      payload: [{
        genders,
        paymentMethods,
        typesOfAddress,
      }],
      error: false,
    });
  }

  async forMarketer(req: FastifyRequest<{
    Querystring: {
      lat: number,
      long: number
    }
  }>, rep: FastifyReply) {
    const { lat, long } = req.query;

    const genders = await FormFields.indexGender();
    const fairs = await Fair.index();

    const orderedFairs = orderByDistance({ latitude: lat, longitude: long }, fairs as any);

    return rep.send({
      code: 200,
      payload: [{
        genders,
        closeFairs: orderedFairs.slice(0, 5),
      }],
      error: false,
    });
  }

  async forDeliveryman(_req: FastifyRequest, rep: FastifyReply) {
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
  }

  async listCloseFairs(req: FastifyRequest<{
    Querystring: {
      lat: number,
      long: number
    }
  }>, rep: FastifyReply) {
    const { lat, long } = req.query;

    const fairs = await Fair.index();

    const daysOfWeeks = await FormFields.indexDaysOfWeek();

    const orderedFairs = orderByDistance({ latitude: lat, longitude: long }, fairs as any);

    return rep.send({
      code: 200,
      payload: [{
        fairs: orderedFairs,
        daysOfWeeks,
      }],
      error: false,
    });
  }
}

export default new FormFieldsController();
