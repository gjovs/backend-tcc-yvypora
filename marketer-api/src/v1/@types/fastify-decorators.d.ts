import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    auth: (req: unknown, rep: unknown) => Promise<unknown>;
    checkOwner: (req: unknown, rep: unknown) => Promise<unknown>;
  }
}
