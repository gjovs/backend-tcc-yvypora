import { PrismaError, PrismaErrorCode } from '../types/prismaErrorTypes';

interface ErrorInfo {
  message: string;
  statusCode: number;
}

export const getErrorMessage = (errorCode: PrismaErrorCode): ErrorInfo => {
  switch (errorCode) {
    case PrismaErrorCode.NotFound:
      return { message: PrismaError.NotFound, statusCode: 404 };
    case PrismaErrorCode.DuplicateEntry:
      return { message: PrismaError.DuplicateEntry, statusCode: 409 };
    case PrismaErrorCode.InvalidInput:
      return { message: PrismaError.InvalidInput, statusCode: 400 };
    case PrismaErrorCode.Unauthorized:
      return { message: PrismaError.Unauthorized, statusCode: 401 };
    case PrismaErrorCode.Forbidden:
      return { message: PrismaError.Forbidden, statusCode: 403 };
    case PrismaErrorCode.InternalServerError:
      return { message: PrismaError.InternalServerError, statusCode: 500 };
    default:
      return { message: 'Unknown error', statusCode: 500 };
  }
};
