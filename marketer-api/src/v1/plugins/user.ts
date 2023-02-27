import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default async function (server: FastifyInstance) {
  server.get('/details', { onRequest: [server.auth] }, (req: FastifyRequest, rep: FastifyReply) => rep.send(req.user.payload));
}
