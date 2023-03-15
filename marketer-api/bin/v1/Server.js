"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const routes_1 = require("./routes");
const decorators_1 = require("./decorators");
class Server {
    constructor() {
        this.app = (0, fastify_1.default)({
            logger: true,
        });
        this.middleware();
        this.decorators();
        this.plugins();
    }
    async middleware() {
        this.app.register(jwt_1.default, {
            secret: '12313123123',
            sign: {
                expiresIn: '7d',
            },
        });
        this.app.register(multipart_1.default, {
            attachFieldsToBody: true,
        });
        await this.app.register(cors_1.default, {
            origin: true,
        });
    }
    plugins() {
        this.app.register(routes_1.userRoutes, {
            prefix: '/user/',
        });
        this.app.register(routes_1.fairRoutes, {
            prefix: '/fair/',
        });
        this.app.register(routes_1.productRoutes, {
            prefix: '/product/',
        });
    }
    decorators() {
        this.app.decorate('auth', decorators_1.auth);
        this.app.decorate('checkOwner', decorators_1.checkOwner);
    }
}
exports.default = new Server().app;
