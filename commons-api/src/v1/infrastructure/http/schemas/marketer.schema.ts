import { FastifySchema } from "fastify";

export const createMarketerSchema: FastifySchema = {
  body: {
    type: "object",
    required: [
      "name",
      "email",
      "password",
      "location",
      "gender",
      "phone",
      "birthday",
    ],
    properties: {
      name: { type: "string" },
      cpf: { type: "string" },
      cnpj: { type: "string" },
      birthday: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      phone: { type: "string" },
      gender: { type: "string" },
      location: {
        type: "object",
        properties: {
          latitude: { type: "number" },
          longitude: { type: "number" },
        },
      },
    },
  },
};

export const updateMarketerSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      cpf: { type: "string" },
      cnpj: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      gender: { type: "string" },
      birthday: { type: "string" },
    },
  },
};
