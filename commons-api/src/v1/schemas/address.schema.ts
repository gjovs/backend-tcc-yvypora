import { FastifySchema } from "fastify";

export const createAddressSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["address"],
    properties: {
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
