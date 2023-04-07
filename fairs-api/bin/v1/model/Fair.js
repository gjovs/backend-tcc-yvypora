"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../libs/prisma"));
class Fair {
    async create(data) {
        try {
            const res = await prisma_1.default.fair.create({
                data: {
                    location: {
                        create: {
                            latitude: data.address.latitude,
                            longitude: data.address.longitude,
                        },
                    },
                    address: {
                        create: {
                            cep: data.address.cep,
                            uf: {
                                connectOrCreate: {
                                    where: {
                                        name: data.address.uf,
                                    },
                                    create: {
                                        name: data.address.uf,
                                    },
                                },
                            },
                            city: {
                                connectOrCreate: {
                                    where: {
                                        name: data.address.city,
                                    },
                                    create: {
                                        name: data.address.city,
                                    },
                                },
                            },
                            neighborhood: {
                                connectOrCreate: {
                                    create: {
                                        name: data.address.neighborhood,
                                    },
                                    where: {
                                        name: data.address.neighborhood,
                                    },
                                },
                            },
                            complemento: data.address.complemento,
                            type: {
                                connect: { id: 3 },
                            },
                            number: data.address.number,
                        },
                    },
                },
            });
            const dateRelations = await Promise.all(data.dateAndHourOfWork.map(async (date) => {
                const relation = await prisma_1.default.date_and_hour_of_work.create({
                    data: {
                        day_of_weekId: date.dayOfWeek.id,
                        open_datetime: date.open,
                        close_datetime: date.close,
                    },
                });
                return relation;
            }));
            await Promise.all(dateRelations.map(async (rel) => {
                await prisma_1.default.fair_date_hour_of_work.create({
                    data: {
                        fairId: res.id,
                        date_and_hour_of_workId: rel.id,
                    },
                });
            }));
            return { error: false, message: 'Successfully saved a new fair' };
        }
        catch (error) {
            if (error instanceof Error) {
                return { error: true, message: error.message, code: 400 };
            }
        }
    }
    async getByCep(cep) {
        const res = await prisma_1.default.fair.findMany({
            where: {
                address: {
                    cep,
                },
            },
        });
        return res;
    }
}
exports.default = new Fair();
