import { FastifySchema } from "fastify";

export const createCostumerSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["name", "email", "password", "address", "birthday"],
    properties: {
      name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
      gender: {
        type: "string",
      },
      birthday: {
        type: "string",
      },
      address: {
        type: "object",
        required: [
          "cep",
          "number",
          "complemento",
          "addressTypeId",
          "city",
          "uf",
          "neighborhood",
          "logradouro",
        ],
        properties: {
          cep: {
            type: "string",
          },
          number: {
            type: "number",
          },
          complemento: {
            type: "string",
          },
          addressTypeId: {
            type: "number",
          },
          city: {
            type: "string",
          },
          logradouro: {
            type: "string",
          },
          uf: {
            type: "string",
          },
          neighborhood: {
            type: "string",
          },
        },
      },
    },
  },
};
export const updateCostumerSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
      cpf: {
        type: "string",
      },
      birthday: {
        type: "string",
      },
    },
  },
};
