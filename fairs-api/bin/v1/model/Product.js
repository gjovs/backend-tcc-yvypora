"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../libs/prisma"));
class Product {
    async create(data, ownerId) {
        try {
            const res = await prisma_1.default.product.create({
                data: {
                    marketer: {
                        connect: {
                            id: ownerId,
                        },
                    },
                    category_of_product: {
                        connect: {
                            id: data.category.id,
                        },
                    },
                    price: data.price,
                    name: data.name,
                    available_quantity: data.available_quantity,
                    type_of_price_product: {
                        connect: {
                            id: data.price_type.id,
                        },
                    },
                },
            });
            return { error: false, data: res };
        }
        catch (error) {
            if (error instanceof Error) {
                return { error: true, message: 'Failed to save new product in database', code: 401 };
            }
        }
    }
    async disable(id) {
        try {
            await prisma_1.default.product.update({
                where: { id },
                data: {
                    active_for_selling: false,
                },
            });
            return { error: false, message: 'Success disabled', code: 200 };
        }
        catch (error) {
            if (error instanceof Error) {
                return { error: true, message: 'Failed to disable this product, id is wrong!', code: 401 };
            }
        }
    }
    async update(data, id) {
        try {
            const product = await prisma_1.default.product.update({
                where: {
                    id,
                },
                data: {
                    available_quantity: data.available_quantity,
                    price: data.price,
                    type_of_price_product: {
                        connect: {
                            id: data.price_type.id,
                        },
                    },
                    name: data.name,
                    category_of_product: {
                        connect: {
                            id: data.category.id,
                        },
                    },
                },
            });
            return { data: product, error: false };
        }
        catch (error) {
            if (error instanceof Error) {
                return {
                    error: true,
                    message: 'Failed to update this product, check if this id is correctly assigment',
                    code: 404,
                };
            }
        }
    }
    async index(marketerId) {
        const res = await prisma_1.default.product.findMany({
            where: {
                marketerId,
            },
        });
        return res;
    }
    async get(id, ownerId) {
        try {
            const res = await prisma_1.default.product.findUnique({
                where: {
                    id,
                },
            });
            if (!res) {
                return {
                    error: true, message: 'Failed to get this product, check if this id is correct', code: 404,
                };
            }
            if (res.marketerId !== ownerId) {
                return {
                    error: true,
                    message: 'Unauthorized operation, this product does not match if the marketer token provided',
                    code: 401,
                };
            }
            return { error: false, data: res, code: 200 };
        }
        catch (error) {
            if (error instanceof Error) {
                return { error: true, message: 'Failed to get this product, check if this ID is correct', code: 404 };
            }
        }
    }
    async appendPicture(id, uri) {
        try {
            await prisma_1.default.product.update({
                where: {
                    id,
                },
                data: {
                    image_of_product: {
                        create: {
                            image: {
                                create: {
                                    uri,
                                },
                            },
                        },
                    },
                },
            });
            return { error: false, message: 'Successfully appended image to product' };
        }
        catch (error) {
            if (error instanceof Error) {
                return { error: true, code: 401, message: error.message };
            }
        }
    }
    async removePicture(id) {
        try {
            await prisma_1.default.image.delete({
                where: { id },
            });
            return { error: false, message: 'Successfully removed image to product' };
        }
        catch (error) {
            if (error instanceof Error) {
                return { error: true, code: 401, message: error.message };
            }
        }
    }
    async enable(id) {
        try {
            await prisma_1.default.product.update({
                where: { id },
                data: {
                    active_for_selling: true,
                },
            });
            return { error: false, message: 'Success enabled', code: 200 };
        }
        catch (error) {
            if (error instanceof Error) {
                return { error: true, message: 'Failed to disable this product, id is wrong!', code: 401 };
            }
        }
    }
    async checkOwner(ownerId, productId) {
        try {
            const res = await prisma_1.default.product.findMany({
                where: {
                    id: productId,
                    marketerId: ownerId,
                },
            });
            if (res.length === 0)
                return false;
            return true;
        }
        catch (error) {
            if (error instanceof Error) {
                return { error: true, code: 401, message: 'this operarion is not valid because the owner token is not the same of the product owner' };
            }
        }
    }
    async addSaleOff(ownerId, productId, value) {
        try {
            const product = await prisma_1.default.product.findMany({
                where: {
                    id: productId,
                    marketerId: ownerId,
                },
            });
            const { id } = product[0];
            await prisma_1.default.sale_off.create({
                data: {
                    productId: id,
                    value,
                },
            });
            return { error: false, code: 200, message: 'Successfully sale off appended in the product!' };
        }
        catch (error) {
            if (error instanceof Error) {
                return { error: true, code: 401, message: 'Bad id or bad value parsed to sale off appended' };
            }
        }
        return { error: true, code: 401, message: 'Bad id or bad value parsed to sale off appended' };
    }
    async removeSaleOff(ownerId, productId) {
        try {
            const product = await prisma_1.default.product.findMany({
                where: {
                    id: productId,
                    marketerId: ownerId,
                },
            });
            const { id } = product[0];
            await prisma_1.default.sale_off.deleteMany({
                where: {
                    productId: id,
                },
            });
            return { error: false, code: 200, message: 'Successfully sale off removed in the product!' };
        }
        catch (error) {
            if (error instanceof Error) {
                return { error: true, code: 401, message: 'Bad id or bad value parsed to sale off appended' };
            }
        }
        return { error: true, code: 401, message: 'Bad id or bad value parsed to sale off appended' };
    }
}
exports.default = new Product();
