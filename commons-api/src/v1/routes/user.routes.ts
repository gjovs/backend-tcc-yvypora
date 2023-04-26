import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TypeOfUser } from "../services/utils/enums";
import { User } from "../services";
import { CostumerController } from "../controllers";
import DecodedToken from "../dao/dto/DecodedToken";

export default async function (server: FastifyInstance) {
  server.get(
    "/details",
    { onRequest: [server.auth] },
    async (req: FastifyRequest, rep: FastifyReply) => {
      const { typeof: userType, id } = req.user as DecodedToken;

      if (userType === TypeOfUser.COSTUMER) {
        const user = await User.findCostumerById(id);

        if (!user) {
          return rep
            .status(404)
            .send({ error: true, message: ["id is wrong user not founded"] });
        }

        const res = await User.findCostumerById(id);
        return { ...res, typeof: "COSTUMER" };
      }

      if (userType === TypeOfUser.MARKETER) {
        const user = await User.findMarketerById(id);

        if (!user) {
          return rep
            .status(404)
            .send({ error: true, message: ["id is wrong user not founded"] });
        }

        const res = await User.findMarketerById(id);
        return { ...res, typeof: "MARKETER" };
      }

      if (userType === TypeOfUser.DELIVERYMAN) {
        const user = await User.findDeliverymanById(id);

        if (!user) {
          return rep
            .status(404)
            .send({ error: true, message: ["id is wrong user not founded"] });
        }

        const res = await User.findDeliverymanById(id);
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
