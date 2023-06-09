import "@fastify/jwt"

export enum TypeOfUser {
  COSTUMER = "COSTUMER",
  MARKETER = "MARKETER",
  DELIVERYMAN = "DELIVERYMAN",
}

export interface DecodedToken {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  picture_uri: string | null;
  review: number;
  online: boolean;
  locationId: number;
  created_at: Date;
  updated_at: Date;
  genderId: number;
  cnpj: string | null;
  cpf: string | null;
  phone: string;
  typeof: TypeOfUser;
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      user: DecodedToken
    }
    user: DecodedToken
  }
}