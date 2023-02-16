import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import jwt from '@fastify/jwt';

import { loginPlugin, registerPlugin, picturePlugin } from './plugins';

class Server {
  declare app: FastifyInstance;

  constructor() {
    this.app = Fastify({
      logger: true,
    });

    this.middleware();
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
}

export default new Server().app;
