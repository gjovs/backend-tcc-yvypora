import { FastifyInstance, FastifyRequest } from 'fastify';
import Marketer from '../services/marketer.service';

export default async function marketerRoutes(server: FastifyInstance) {
  server.get(
    '/:id',
    async (
      req: FastifyRequest<{
        Params: { id: string };
      }>,
      rep,
    ) => {
      const { id } = req.params;

      const marketer = await Marketer.get(parseInt(id, 10));

      if (!marketer) {
        return rep.status(404).send({
          code: 404,
          error: true,
          message: 'Content not found!, check the id',
        });
      }

      return rep.send({
        code: 200,
        error: false,
        data: marketer,
      });
    },
  );
}
