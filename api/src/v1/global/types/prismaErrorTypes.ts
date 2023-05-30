export enum PrismaError {
  NotFound = 'Resource not found',
  DuplicateEntry = 'Duplicate entry',
  InvalidInput = 'Invalid input',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  InternalServerError = 'Internal server error',
}

export enum PrismaErrorCode {
  NotFound = 'P2025',
  DuplicateEntry = 'P2002',
  InvalidInput = 'P3012',
  Unauthorized = 'P4001',
  Forbidden = 'P4031',
  InternalServerError = 'P5001',
}
