import fastify from 'fastify';
import { FastifyRequest } from 'fastify/types/request';
import DecodedToken from '../commons/src/v1/domain/dto/DecodedToken';

declare module 'fastify' {
  export interface FastifyRequest {
    user: DecodedToken;
  }
}
