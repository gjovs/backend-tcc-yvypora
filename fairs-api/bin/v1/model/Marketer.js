"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../libs/prisma"));
class Marketer {
    async get(id) {
        const res = await prisma_1.default.marketer.findUnique({ where: { id } });
        return res;
    }
    async indexFairs(id) {
        try {
            const res = await prisma_1.default.fair_marketers.findMany({
                where: {
                    marketerId: id,
                },
                include: {
                    fair: {
                        include: {
                            location: true,
                            fair_date_hour_of_work: {
                                include: {
                                    dates: {
                                        include: {
                                            day_of_week: true,
                                        },
                                    },
                                },
                            },
                            address: {
                                include: {
                                    type: true,
                                    city: true,
                                    uf: true,
                                    neighborhood: true,
                                },
                            },
                        },
                    },
                },
            });
            return res;
        }
        catch (error) {
            if (error instanceof Error) {
                return { error: true, messaeg: 'Bad id', code: 401 };
            }
        }
    }
    async addFair(marketerId, fairId) {
        try {
            const res = await prisma_1.default.marketer.update({
                where: {
                    id: marketerId,
                },
                select: {
                    fair_marketers: true,
                    id: true,
                },
                data: {
                    fair_marketers: {
                        create: {
                            fairId,
                        },
                    },
                },
            });
            return { data: res, error: false };
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error);
                return { message: error.message, error: true, code: 400 };
            }
        }
    }
    async removeFair(marketerId, fairId) {
        try {
            console.log(marketerId, fairId);
            const findRelation = await prisma_1.default.fair_marketers.findMany({
                where: {
                    AND: [
                        {
                            fairId,
                        },
                        {
                            marketerId,
                        },
                    ],
                },
            });
            await prisma_1.default.fair_marketers.delete({
                where: {
                    id: findRelation[0].id,
                },
            });
            return { message: 'Succely removed relation with fair!', error: false };
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error);
                return { message: error.message, error: true, code: 401 };
            }
        }
    }
}
exports.default = new Marketer();
