import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      payload: {
        id: number
      };
    };
  }
}
