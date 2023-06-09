import { log } from "console";
import { FastifyReply, FastifyRequest } from "fastify";
import DecodedToken from "../../domain/dto/DecodedToken";

export default async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const { payload } = (await req.jwtVerify()) as {
      payload:  DecodedToken;
    };    
    req.user = payload;
  } catch (e) {
    return rep.send(e);
  }
};
