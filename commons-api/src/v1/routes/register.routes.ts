import { FastifyInstance } from "fastify";
import {
  AddressController,
  CostumerController,
  MarketerController,
} from "../controllers";
import {
  createMarketerSchema,
  updateMarketerSchema,
} from "../schemas/marketer.schema";
import { createAddressSchema } from "../schemas/address.schema";
import {
  createCostumerSchema,
  updateCostumerSchema,
} from "../schemas/costumer.schema";

export default async function registerRoutes(server: FastifyInstance) {
  server.post(
    "/costumer",
    {
      schema: createCostumerSchema,
    },
    CostumerController.create
  );

  // update costumer
  server.put(
    "/costumer/:id",
    {
      schema: updateCostumerSchema,
    },
    CostumerController.update
  );

  server.delete("/costumer/:id", CostumerController.delete);

  server.put(
    "/costumer/address/:id",
    {
      schema: createAddressSchema,
    },
    AddressController.addToCostumer
  );

  server.delete("/costumer/address/:id", AddressController.removeToCostumer);

  server.post(
    "/marketer",
    {
      schema: createMarketerSchema,
    },
    MarketerController.create
  );

  server.delete("/marketer/:id", MarketerController.delete);

  server.put(
    "/marketer/:id",
    {
      schema: updateMarketerSchema,
    },
    MarketerController.update
  );
}
