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
      prefix: 'api/commons/register/',
    });
    this.app.register(loginRoutes, {
      prefix: 'api/commons/login/',
    });
    this.app.register(pictureRoutes, {
      prefix: 'api/commons/picture/',
    });
    this.app.register(formFieldsRoutes, {
      prefix: 'api/commons/forms/',
    });
    this.app.register(fairRoutes, {
      prefix: 'api/commons/fair/',
    });
    this.app.register(userRoutes, {
      prefix: 'api/commons/user/',
    });

    this.app.register(userRoutesCostumer, {
      prefix: 'api/costumer/user/',
    });
    this.app.register(fairRoutesCostumer, {
      prefix: 'api/costumer/fair/',
    });
    this.app.register(productRoutes, {
      prefix: 'api/costumer/product/',
    });
    this.app.register(marketerRoutes, {
      prefix: 'api/costumer/marketer/',
    });
    this.app.register(purchaseRoutes, {
      prefix: 'api/costumer/purchases/',
    });
    this.app.register(searchRoutes, {
      prefix: 'api/costumer/search/',
    });
    this.app.register(testRoutes, {
      prefix: 'api/costumer/test/',
    });
    this.app.register(reviewRoutes, {
      prefix: 'api/costumer/review/',
    });

    this.app.register(userRoutesFair, {
      prefix: 'api/fair/user/',
    });

    this.app.register(fairRoutesFair, {
      prefix: 'api/fair/fair/',
    });

    this.app.register(productRoutesFair, {
      prefix: 'api/fair/product/',
    });

    this.app.register(reportsRoutesFair, {
      prefix: 'api/fair/reports/',
    });
  }

  private decorators() {
    this.app.decorate('auth', auth);
    this.app.decorate('checkOwner', checkOwner);
  }
}

export default new Server().app;
