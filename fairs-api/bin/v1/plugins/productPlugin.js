"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const Product_1 = __importDefault(require("../model/Product"));
const firebase_service_1 = __importDefault(require("../services/firebase.service"));
async function productPlugin(server) {
    server.get("/", {
        onRequest: [server.auth],
    }, async (req, rep) => {
        const { id } = req.user;
        const products = await Product_1.default.index(id);
        return rep.send({
            code: 200,
            error: false,
            data: products,
        });
    });
    server.get("/:id", {
        onRequest: [server.auth],
        schema: {
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: { type: "number" },
                },
            },
        },
    }, async (req, rep) => {
        const { id } = req.user;
        const res = await Product_1.default.get(parseInt(req.params.id, 10), id);
        if (res?.error) {
            return rep.status(res?.code).send({
                code: res.code,
                error: true,
                message: res?.message,
            });
        }
        return rep.send({
            code: 200,
            error: false,
            payload: res?.data,
        });
    });
    server.post("/", {
        onRequest: [server.auth],
        schema: {
            body: {
                type: "object",
                required: [
                    "name",
                    "price",
                    "price_type",
                    "category",
                    "available_quantity",
                ],
                properties: {
                    name: { type: "string" },
                    price: { type: "number" },
                    available_quantity: { type: "number" },
                    price_type: {
                        type: "object",
                        required: ["name", "id"],
                        properties: {
                            id: {
                                type: "number",
                            },
                            name: {
                                type: "string",
                            },
                        },
                    },
                    category: {
                        type: "object",
                        required: ["name", "id"],
                        properties: {
                            name: { type: "string" },
                            id: { type: "number" },
                        },
                    },
                },
            },
        },
    }, async (req, rep) => {
        const data = req.body;
        const res = await Product_1.default.create(data, req.user.id);
        if (res?.error) {
            return rep.status(res?.code).send({
                code: res?.code,
                error: true,
                message: res.message,
            });
        }
        return rep.send({
            code: 200,
            error: false,
            payload: res,
        });
    });
    server.put("picture/:id", {
        onRequest: [server.auth],
        schema: {
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: {
                        type: "number",
                    },
                },
            },
            body: {
                type: "object",
                required: ["picture"],
                properties: {
                    picture: {
                        type: "object",
                    },
                },
            },
        },
    }, async (req, rep) => {
        const { picture } = req.body;
        await picture.toBuffer();
        const picture_uri = await firebase_service_1.default.uploadImage(picture);
        const res = await Product_1.default.appendPicture(parseInt(req.params.id, 10), picture_uri);
        if (res?.error) {
            return rep.status(res?.code).send({
                code: res.code,
                message: res.message,
                error: true,
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: res?.message,
        });
    });
    server.delete("picture/:id/", {
        onRequest: [server.auth],
        schema: {
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: {
                        type: "number",
                    },
                },
            },
        },
    }, async (req, rep) => {
        const res = await Product_1.default.removePicture(parseInt(req.params.id, 10));
        if (res?.error) {
            return rep.status(res?.code).send({
                code: res.code,
                message: res.message,
                error: true,
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: res?.message,
        });
    });
    server.put("/:id", {
        onRequest: [server.auth],
        schema: {
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: {
                        type: "number",
                    },
                },
            },
        },
    }, async (req, rep) => {
        const { id } = req.user;
        const isSameOwner = await Product_1.default.checkOwner(id, parseInt(req.params.id, 10));
        if (!isSameOwner) {
            return rep.status(401).send({
                error: true,
                code: 401,
                message: "this operation is not allowed because the owner token is not the same of the product owner",
            });
        }
        const updateProductSchema = zod_1.z.object({
            name: zod_1.z.string(),
            price: zod_1.z.number(),
            price_type: zod_1.z.object({
                id: zod_1.z.number(),
                name: zod_1.z.string(),
            }),
            category: zod_1.z.object({
                name: zod_1.z.string(),
                id: zod_1.z.number(),
            }),
            available_quantity: zod_1.z.number(),
        });
        try {
            const data = updateProductSchema.parse(req.body);
            const res = await Product_1.default.update(data, parseInt(req.params.id, 10));
            if (res?.error) {
                return rep.status(res?.code).send({
                    code: res.code,
                    error: true,
                    message: res.message,
                });
            }
            return rep.send({
                code: 200,
                error: false,
                data: res?.data,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return rep.status(400).send({
                    code: 400,
                    error: true,
                    message: error.message,
                });
            }
        }
        return false;
    });
    server.delete("disable/:id", {
        onRequest: [server.auth],
        schema: {
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: {
                        type: "number",
                    },
                },
            },
        },
    }, async (req, rep) => {
        const { id } = req.user;
        const isSameOwner = await Product_1.default.checkOwner(id, parseInt(req.params.id, 10));
        if (!isSameOwner) {
            return rep.status(401).send({
                error: true,
                code: 401,
                message: "this operation is not allowed because the owner token is not the same of the product owner",
            });
        }
        const res = await Product_1.default.disable(parseInt(req.params.id, 10));
        if (res?.error) {
            return rep.status(res.code).send({
                code: res.code,
                error: true,
                message: res.message,
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: res?.message,
        });
    });
    server.put("enable/:id", {
        onRequest: [server.auth],
        schema: {
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: {
                        type: "number",
                    },
                },
            },
        },
    }, async (req, rep) => {
        const { id } = req.user;
        const isSameOwner = await Product_1.default.checkOwner(id, parseInt(req.params.id, 10));
        if (!isSameOwner) {
            return rep.status(401).send({
                error: true,
                code: 401,
                message: "this operation is not allowed because the owner token is not the same of the product owner",
            });
        }
        const res = await Product_1.default.enable(parseInt(req.params.id, 10));
        if (res?.error) {
            return rep.status(res.code).send({
                code: res.code,
                error: true,
                message: res.message,
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: res?.message,
        });
    });
    server.put("sale_off/:id", {
        onRequest: [server.auth],
        schema: {
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: { type: "number" },
                },
            },
            querystring: {
                type: "object",
                required: ["value"],
                properties: {
                    value: {
                        type: "number",
                    },
                },
            },
        },
    }, async (req, rep) => {
        const { id } = req.user;
        const productId = parseInt(req.params.id, 10);
        const value = parseFloat(req.query.value);
        const isSameOwner = await Product_1.default.checkOwner(id, parseInt(req.params.id, 10));
        if (!isSameOwner) {
            return rep.status(401).send({
                error: true,
                code: 401,
                message: "this operation is not allowed because the owner token is not the same of the product owner",
            });
        }
        const res = await Product_1.default.addSaleOff(id, productId, value);
        return rep.status(res.code).send({
            code: res.code,
            error: res.error,
            message: res.message,
        });
    });
    server.delete("sale_off/:id", {
        onRequest: [server.auth],
        schema: {
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: { type: "number" },
                },
            },
        },
    }, async (req, rep) => {
        const { id } = req.user;
        const productId = parseInt(req.params.id, 10);
        const isSameOwner = await Product_1.default.checkOwner(id, parseInt(req.params.id, 10));
        if (!isSameOwner) {
            return rep.status(401).send({
                error: true,
                code: 401,
                message: "this operation is not allowed because the owner token is not the same of the product owner",
            });
        }
        const res = await Product_1.default.removeSaleOff(id, productId);
        return rep.status(res.code).send({
            code: res.code,
            error: res.error,
            message: res.message,
        });
    });
}
exports.default = productPlugin;
