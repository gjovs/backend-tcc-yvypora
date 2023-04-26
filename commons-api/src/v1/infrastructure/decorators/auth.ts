import { FastifyReply, FastifyRequest } from "fastify";
import DecodedToken from "../../domain/dto/DecodedToken";

export default async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const { payload } = (await req.jwtVerify()) as {
      payload: { user: DecodedToken };
    };
    req.user = payload.user;
  } catch (e) {
    return rep.send(e);
  }
};
