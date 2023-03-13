import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import jwt from '@fastify/jwt';

import { fairPlugin, productPlugin, userPlugin } from './plugins';
import Product from './model/Product';
import product from './model/Product';

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
    this.app.register(userPlugin, {
      prefix: '/user/',
    });

    this.app.register(fairPlugin, {
      prefix: '/fair/',
    });

    this.app.register(productPlugin, {
      prefix: '/product/',
    });
  }

  private decorators() {
    this.app.decorate('auth', async (req: FastifyRequest, rep: FastifyReply) => {
      try {
        const data = await req.jwtVerify();
        // @ts-ignore
        req.user = data.payload;
      } catch (e) {
        return rep.send(e);
      }
    });
    this.app.decorate('checkOwner', async (req: FastifyRequest<{
      Params: {
        id: string
      }
    }>, rep: FastifyReply) => {
      try {
        const ownerId = req.user.id;
        const productId = parseInt(req.params.id, 10);
        const res = await Product.checkOwner(ownerId, productId);

        // @ts-ignore
        if (!res || res?.error) {
          return rep.status(401).send({
            error: true,
            code: 401,
            message: 'this operation is not allowed because the owner token is not the same of the product owner',
          });
        }
      } catch (e) {
        return rep.status(401).send({
          error: true,
          code: 401,
          message: 'this operation is not allowed because the owner token is not the same of the product owner',
        });
      }
    });
  }
}

export default new Server().app;
