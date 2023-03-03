import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import Marketer from '../model/Marketer';

export default async function (server: FastifyInstance) {
  // @ts-ignore
  server.get('/details', { onRequest: [server.auth] }, (req: FastifyRequest, rep: FastifyReply) => rep.send(req.user.payload));

  server.get(
    '/fairs',
    {
    // @ts-ignore
      onRequest: [server.auth],
    },
    async (req, rep) => {
      // @ts-ignore
      const res = await Marketer.indexFairs(req.user.id);

      console.log(res);

      if (!res) {
        return rep.status(404).send({
          code: 404,
          error: true,
          message: 'Fairs not found with this marketer',
        });
      }

      return rep.send({
        code: 200,
        error: false,
        payload: res,
      });
    },
  );
}
