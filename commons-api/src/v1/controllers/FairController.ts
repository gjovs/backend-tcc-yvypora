import { FastifyReply, FastifyRequest } from "fastify";
import { orderByDistance } from "geolib";
import { Fair } from "../services";
import { ILocation } from "../dao/dto/Location";

export class FairController {
  async listByClose(
    req: FastifyRequest<{
      Querystring: ILocation;
    }>,
    rep: FastifyReply
  ) {
    const fairs = await Fair.index();

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
