import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import jwt from '@fastify/jwt';

import {
  fairRoutes, productRoutes, reportsRoutes, userRoutes,
} from './routes';
import { auth, checkOwner } from './decorators';

class Server {
  declare app: FastifyInstance;

  constructor() {
    this.app = Fastify({
      logger: true,
    });

    this.middleware();
    this.decorators();
    this.routes();
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

  private routes() {
    this.app.register(userRoutes, {
      prefix: '/user/',
    });

    this.app.register(fairRoutes, {
      prefix: '/fair/',
    });

    this.app.register(productRoutes, {
      prefix: '/product/',
    });

    this.app.register(reportsRoutes, {
      prefix: '/reports/',
    });
  }

  private decorators() {
    this.app.decorate('auth', auth);
    this.app.decorate('checkOwner', checkOwner);
  }
}

export default new Server().app;