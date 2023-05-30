import { Prisma } from '@prisma/client';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { PrismaErrorCode } from '../types/prismaErrorTypes';

export default async function (
  error: FastifyError,
  req: FastifyRequest,
  rep: FastifyReply
) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const { message, statusCode } = getErrorMessage(
      error.code as PrismaErrorCode
    );
    return rep.status(statusCode).send({
      error: true,
      code: statusCode,
      message,
    });
  }

  return rep.status(500).send({
    error: true,
    code: 500,
    message: 'INTERNAL SERVER ERROR',
  });
}
