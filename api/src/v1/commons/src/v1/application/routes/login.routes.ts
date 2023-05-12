import { FastifyInstance, FastifyRequest } from "fastify";
import { UserRepository } from "../../domain/repositories";
import { checkPassword } from "../../utils/utils";
import { TypeOfUser } from "../../domain/dto/TypeOfUser";
import { loginSchema } from "../../infrastructure/http/schemas/login.schema";

export default async function loginRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: loginSchema,
    },
    async (
      req: FastifyRequest<{
        Body: {
          email: string;
          password: string;
        };
      }>,
      rep
    ) => {
      const { email, password } = req.body;

      let user;

      let typeofUser: TypeOfUser;

      user = await UserRepository.findCostumerByEmail(email);
      typeofUser = TypeOfUser.COSTUMER;
      if (!user) {
        user = await UserRepository.findDeliverymanByEmail(email);
        typeofUser = TypeOfUser.DELIVERYMAN;
        if (!user) {
          user = await UserRepository.findMarketerByEmail(email);
          typeofUser = TypeOfUser.MARKETER;
        }
      }

      if (!user) {
        return rep.status(404).send({
          error: true,
          message: "The user if this email doesnt exist!",
        });
      }

      const isValid = await checkPassword(password, user.password_hash);

      if (!isValid) {
        return rep
          .status(401)
          .send({ error: true, message: "The password is wrong" });
      }

      // @ts-ignore
      user.typeof = typeofUser;

      const data = { payload: user };

      const token = server.jwt.sign(data);

      return rep.send({ token, error: false });
    }
  );
}
