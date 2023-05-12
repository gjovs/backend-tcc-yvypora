import { FastifyReply, FastifyRequest } from "fastify";
import { orderByDistance } from "geolib";
import { FairRepository } from "../../domain/repositories";
import { ILocation } from "../../domain/dto/Location";
import { IFairController } from "../../interfaces/controllers.interface";

export class FairController implements IFairController {
  async listByClose(
    req: FastifyRequest<{
      Querystring: ILocation;
    }>,
    rep: FastifyReply
  ) {
    const fairs = await FairRepository.index();

    const { latitude, longitude } = req.query;

    const originLat = parseFloat(latitude.toString());
    const originLong = parseFloat(longitude.toString());

    const nearPositions = orderByDistance(
      {
        latitude: originLat,
        longitude: originLong,
      },
      fairs as any
    );

    return rep.status(200).send({
      code: 200,
      payload: nearPositions,
      error: false,
    });
  }
}

export default new FairController();
