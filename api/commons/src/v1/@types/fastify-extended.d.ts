import fastify from "fastify";
import { FastifyRequest } from "fastify/types/request";
import DecodedToken from "../domain/dto/DecodedToken";

declare module "fastify" {
  export interface FastifyRequest {
    user: DecodedToken;
  }
}
