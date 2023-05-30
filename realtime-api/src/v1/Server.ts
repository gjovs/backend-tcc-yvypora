import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { auth } from './decorators/';
import chatRoutes from './routes/chat.routes';

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

    await this.app.register(cors, {
      origin: true,
    });
  }

  private routes() {
    this.app.register(chatRoutes, {
      prefix: '/chat',
    });
  }

  private decorators() {
    this.app.decorate('auth', auth);
  }
}

export default new Server().app;
