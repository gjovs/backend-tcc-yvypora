import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import jwt from '@fastify/jwt';

import {
  fairRoutes,
  formFieldsRoutes,
  loginRoutes,
  pictureRoutes,
  registerRoutes,
  userRoutes,
} from './commons/src/v1/application/routes';

import {
  purchaseRoutes,
  fairRoutesCostumer,
  userRoutesCostumer,
  productRoutes,
  marketerRoutes,
  searchRoutes,
  testRoutes,
  reviewRoutes,
} from './costumer/src/v1/routes';

import {
  fairRoutesFair,
  productRoutesFair,
  reportsRoutesFair,
  userRoutesFair,
} from './fairs/src/v1/routes';

import { auth } from './commons/src/v1/infrastructure/decorators';
import { checkOwner } from './fairs/src/v1/decorators';

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
    this.app.register(registerRoutes, {
      prefix: 'commons/register/',
    });
    this.app.register(loginRoutes, {
      prefix: 'commons/login/',
    });
    this.app.register(pictureRoutes, {
      prefix: 'commons/picture/',
    });
    this.app.register(formFieldsRoutes, {
      prefix: 'commons/forms/',
    });
    this.app.register(fairRoutes, {
      prefix: 'commons/fair/',
    });
    this.app.register(userRoutes, {
      prefix: 'commons/user/',
    });

    this.app.register(userRoutesCostumer, {
      prefix: 'costumer/user/',
    });
    this.app.register(fairRoutesCostumer, {
      prefix: 'costumer/fair/',
    });
    this.app.register(productRoutes, {
      prefix: 'costumer/product/',
    });
    this.app.register(marketerRoutes, {
      prefix: 'costumer/marketer/',
    });
    this.app.register(purchaseRoutes, {
      prefix: 'costumer/purchases/',
    });
    this.app.register(searchRoutes, {
      prefix: 'costumer/search/',
    });
    this.app.register(testRoutes, {
      prefix: 'costumer/test/',
    });
    this.app.register(reviewRoutes, {
      prefix: 'costumer/review/',
    });

    this.app.register(userRoutesFair, {
      prefix: 'fair/user/',
    });

    this.app.register(fairRoutesFair, {
      prefix: 'fair/fair/',
    });

    this.app.register(productRoutesFair, {
      prefix: 'fair/product/',
    });

    this.app.register(reportsRoutesFair, {
      prefix: 'fair/reports/',
    });
  }

  private decorators() {
    this.app.decorate('auth', auth);
    this.app.decorate('checkOwner', checkOwner);
  }
}

export default new Server().app;
