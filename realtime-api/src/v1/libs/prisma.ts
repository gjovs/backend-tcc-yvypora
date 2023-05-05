import { PrismaClient as PrismaClientMysql } from '../../../database/prisma/generated/mysql';
import { PrismaClient as PrismaClientMongo } from '../../../database/prisma/generated/mongo';

export const db = new PrismaClientMysql({
  errorFormat: 'pretty',
});

export const mongoDB = new PrismaClientMongo({
  errorFormat: 'pretty',
});
