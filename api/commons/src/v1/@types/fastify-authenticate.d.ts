import 'fastify';

declare module 'fastify' {
  export interface FastifyInstance {
    auth: (req: unknown, rep: unknown) => Promise<unknown>;
  }
}
