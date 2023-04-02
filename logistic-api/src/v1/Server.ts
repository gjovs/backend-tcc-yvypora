import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import websocketFastify from "@fastify/websocket";
import { auth } from "./decorators/";
import { homeRoutes, orderRoutes } from "./routes";

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
      secret: "12313123123",
      sign: {
        expiresIn: "7d",
      },
    });

    this.app.register(websocketFastify);

    await this.app.register(cors, {
      origin: true,
    });
  }

  private routes() {
    this.app.register(homeRoutes, { prefix: "/" });
    this.app.register(orderRoutes, { prefix: "/order/" });
  }

  private decorators() {
    this.app.decorate("auth", auth);
  }
}

export default new Server().app;
