import { FastifyReply, FastifyRequest } from "fastify";
import { orderByDistance } from "geolib";
import { FairRepository, FormFieldRepository } from "../repositories";
import { ILocation } from "../dao/dto/Location";

export class FormFieldsController {
  async listCategories(_req: FastifyRequest, rep: FastifyReply) {
    const categories = await FormFieldRepository.indexCategories();

    return rep.send({
      code: 200,
      error: false,
      data: categories,
    });
  }

  async forCostumer(_req: FastifyRequest, rep: FastifyReply) {
    const genders = await FormFieldRepository.indexGender();
    const paymentMethods = await FormFieldRepository.indexPaymentMethods();
    const typesOfAddress = await FormFieldRepository.indexTypeOfAddress();

    return rep.send({
      code: 200,
      payload: [
        {
          genders,
          paymentMethods,
          typesOfAddress,
        },
      ],
      error: false,
    });
  }

  async forMarketer(
    req: FastifyRequest<{
      Querystring: ILocation;
    }>,
    rep: FastifyReply
  ) {
    const { latitude, longitude } = req.query;

    const genders = await FormFieldRepository.indexGender();
    const fairs = await FairRepository.index();

    const orderedFairs = orderByDistance({ latitude, longitude }, fairs as any);

    return rep.send({
      code: 200,
      payload: [{ genders, closeFairs: orderedFairs.slice(0, 5) }],
      error: false,
    });
  }

  async forDeliveryman(_req: FastifyRequest, rep: FastifyReply) {
    const genders = await FormFieldRepository.indexGender();
    const veicules = await FormFieldRepository.indexTypeOfVeicules();

    return rep.send({
      code: 200,
      payload: [
        {
          genders,
          veicules,
        },
      ],
      error: false,
    });
  }

  async listCloseFairs(
    req: FastifyRequest<{
      Querystring: ILocation;
    }>,
    rep: FastifyReply
  ) {
    const { latitude, longitude } = req.query;

    const fairs = await FairRepository.index();

    const daysOfWeeks = await FormFieldRepository.indexDaysOfWeek();

    const orderedFairs = orderByDistance({ latitude, longitude }, fairs as any);

    return rep.send({
      code: 200,
      payload: [
        {
          fairs: orderedFairs,
          daysOfWeeks,
        },
      ],
      error: false,
    });
  }
}

export default new FormFieldsController();
