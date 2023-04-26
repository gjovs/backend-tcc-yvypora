import { FastifySchema } from "fastify";

export const locationSchema: FastifySchema = {
  querystring: {
    type: "object",
    required: ["latitude", "longitude"],
    properties: {
      latitude: { type: "string" },
      longitude: { type: "string" },
    },
  },
};


