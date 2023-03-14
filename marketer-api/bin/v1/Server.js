"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const plugins_1 = require("./plugins");
const Product_1 = __importDefault(require("./model/Product"));
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
        this.app.register(plugins_1.userPlugin, {
            prefix: '/user/',
        });
        this.app.register(plugins_1.fairPlugin, {
            prefix: '/fair/',
        });
        this.app.register(plugins_1.productPlugin, {
            prefix: '/product/',
        });
    }
    decorators() {
        this.app.decorate('auth', async (req, rep) => {
            try {
                const data = await req.jwtVerify();
                req.user = data.payload;
            }
            catch (e) {
                return rep.send(e);
            }
        });
        this.app.decorate('checkOwner', async (req, rep) => {
            try {
                const ownerId = req.user.id;
                const productId = parseInt(req.params.id, 10);
                const res = await Product_1.default.checkOwner(ownerId, productId);
                if (!res || res?.error) {
                    return rep.status(401).send({
                        error: true,
                        code: 401,
                        message: 'this operation is not allowed because the owner token is not the same of the product owner',
                    });
                }
            }
            catch (e) {
                return rep.status(401).send({
                    error: true,
                    code: 401,
                    message: 'this operation is not allowed because the owner token is not the same of the product owner',
                });
            }
        });
    }
}
exports.default = new Server().app;
