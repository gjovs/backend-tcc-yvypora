import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import jwt from '@fastify/jwt';

import { loginPlugin, picturePlugin, registerPlugin } from './plugins';

class Server {
  declare app: FastifyInstance;

  constructor() {
    this.app = Fastify({
      logger: true,
    });

    this.middleware();
    this.decorators();
    this.plugins();
  }

  private async middleware() {
    this.app.register(jwt, {
      secret: '12313123123',
      sign: {
        expiresIn: '7d',
      },
    });
    this.app.register(multipart, {
      attachFieldsToBody: true,
    });

    await this.app.register(cors, {
      origin: true,
    });
  }

  private plugins() {
    this.app.register(registerPlugin, {
      prefix: '/register/',
    });
    this.app.register(loginPlugin, {
      prefix: '/login/',
    });
    this.app.register(picturePlugin, {
      prefix: '/picture/',
    });
  }

  private decorators() {
    this.app.decorate('auth', async (req: FastifyRequest, rep: FastifyReply) => {
      try {
        await req.jwtVerify();
      } catch (e) {
        return rep.send(e);
      }
    });
  }
}

export default new Server().app;
