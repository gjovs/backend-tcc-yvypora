import { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";
import Fair from "../services/fair.service";
import { IAddress, IFair } from "../utils/interfaces";
import { OsmService } from "../services";

export class FairController {
  async create(
    req: FastifyRequest<{
      Body: IFair;
    }>,
    rep: FastifyReply
  ) {
    const { dateAndHourOfWork, address, name } = req.body;

    const check = await Fair.getByCep(address.cep);

    if (check.length > 0) {
      return rep.status(401).send({
        code: 401,
        error: true,
        message: "We already have this fair in this CEP value",
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

    const addressObject = OsmService.getGeocoding(address);

    if (!addressObject) {
      rep.code(400).send({
        error: true,
        message: "This CEP value cant be search, probably is wrong!",
      });
    }

    if (!dateAndHourOfWork.length) {
      return rep.status(400).send({
        code: 400,
        error: true,
        message:
          "It is required some date and hour of work to save a new fair in the database",
      });
    }

    const data = { address: addressObject, dateAndHourOfWork, name };

    const res = await Fair.create(data);

    return res;
  }
}

export default new FairController();
