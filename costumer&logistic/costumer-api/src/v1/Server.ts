import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import jwt from '@fastify/jwt';
import websocketFastify from '@fastify/websocket';

import {
  fairRoutes, userRoutes, productRoutes, marketerRoutes,
} from './routes';
import { auth } from './decorators';
import purchaseRoutes from './routes/purchaseRoutes';

class Server {
  declare app: FastifyInstance;

  constructor() {
    this.app = Fastify({
      logger: true,
    });

    this.middlewares();
    this.decorators();
    this.routes();
  }

  private async middlewares() {
    this.app.register(jwt, {
      secret: '12313123123',
      sign: {
        expiresIn: '7d',
      },
    });
    this.app.register(multipart, {
      attachFieldsToBody: true,
    });

    this.app.register(websocketFastify);

    await this.app.register(cors, {
      origin: true,
    });
  }

  private routes() {
    this.app.register(userRoutes, {
      prefix: '/api/costumer/user/',
    });
    this.app.register(fairRoutes, {
      prefix: '/api/costumer/fair/',
    });
    this.app.register(productRoutes, {
      prefix: '/api/costumer/product/',
    });
    this.app.register(marketerRoutes, {
      prefix: '/api/costumer/marketer/',
    });
    this.app.register(purchaseRoutes, {
      prefix: '/api/costumer/purchases/',
    });
  }

  private decorators() {
    this.app.decorate('auth', auth);
  }
}

export default new Server().app;
