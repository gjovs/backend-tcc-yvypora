import { FastifySchema } from "fastify";

export const uploadPictureSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["picture"],
    properties: {
      picture: {
        type: "object",
      },
    },
  },
};
