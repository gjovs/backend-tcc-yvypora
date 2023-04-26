import { FastifyInstance } from "fastify";
import { FormFieldsController } from "../controllers";
import { locationSchema } from "../schemas/location.schema";

export default async function formFieldsRoutes(server: FastifyInstance) {
  server.get("/categories", FormFieldsController.listCategories);

  server.get("/costumer", FormFieldsController.forCostumer);

  server.get(
    "/marketer",
    {
      schema: locationSchema
    },
    FormFieldsController.forMarketer
  );

  server.get("/deliveryman", FormFieldsController.forDeliveryman);

  server.get(
    "/fairs",
    {
      schema: locationSchema
    },
    FormFieldsController.listCloseFairs
  );
}
