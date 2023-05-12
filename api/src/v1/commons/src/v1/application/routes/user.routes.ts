import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TypeOfUser } from "../../domain/dto/TypeOfUser";
import { UserRepository } from "../../domain/repositories";
import { CostumerController } from "../controllers";
import DecodedToken from "../../domain/dto/DecodedToken";

export default async function (server: FastifyInstance) {
  server.get(
    "/details",
    { onRequest: [server.auth] },
    async (req: FastifyRequest, rep: FastifyReply) => {
      console.log(req.user);
      
      const { typeof: userType, id } = req.user as DecodedToken;

      if (userType === TypeOfUser.COSTUMER) {
        const user = await UserRepository.findCostumerById(id);

        if (!user) {
          return rep
            .status(404)
            .send({ error: true, message: ["id is wrong user not founded"] });
        }

        const res = await UserRepository.findCostumerById(id);
        return { ...res, typeof: "COSTUMER" };
      }

      if (userType === TypeOfUser.MARKETER) {
        const user = await UserRepository.findMarketerById(id);

        if (!user) {
          return rep
            .status(404)
            .send({ error: true, message: ["id is wrong user not founded"] });
        }

        const res = await UserRepository.findMarketerById(id);
        return { ...res, typeof: "MARKETER" };
      }

      if (userType === TypeOfUser.DELIVERYMAN) {
        const user = await UserRepository.findDeliverymanById(id);

        if (!user) {
          return rep
            .status(404)
            .send({ error: true, message: ["id is wrong user not founded"] });
        }

        const res = await UserRepository.findDeliverymanById(id);
        return { ...res, typeof: "DELIVERYMAN" };
      }

      return rep.status(400).send({
        code: 400,
        message: "Bad id",
      });
    }
  );
  server.get(
    "/address",
    { onRequest: [server.auth] },
    CostumerController.listAddress
  );
}
