import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import jwt from "@fastify/jwt";

import {
  fairRoutes,
  formFieldsRoutes,
  loginRoutes,
  pictureRoutes,
  registerRoutes,
  userRoutes,
} from "./application/routes";

import { auth } from "./infrastructure/decorators";

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
      secret: "12313123123",
      sign: {
        expiresIn: "7d",
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
      prefix: "/register/",
    });
    this.app.register(loginRoutes, {
      prefix: "/login/",
    });
    this.app.register(pictureRoutes, {
      prefix: "/picture/",
    });
    this.app.register(formFieldsRoutes, {
      prefix: "/forms/",
    });
    this.app.register(fairRoutes, {
      prefix: "/fair/",
    });
    this.app.register(userRoutes, {
      prefix: "/user/",
    });
  }

  private decorators() {
    this.app.decorate("auth", auth);
  }
}

export default new Server().app;
