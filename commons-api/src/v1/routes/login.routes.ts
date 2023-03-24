import { FastifyInstance, FastifyRequest } from 'fastify';
import { User } from '../services';
import { checkPassword } from '../utils/utils';
import { TypeOfUser } from '../services/utils/enums';

export default async function loginRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
      },
    },
    async (
      req: FastifyRequest<{
        Body: {
          email: string;
          password: string;
        };
      }>,
      rep,
    ) => {
      const { email, password } = req.body;

      let user;

      let typeofUser: TypeOfUser;

      user = await User.findCostumerByEmail(email);
      typeofUser = TypeOfUser.COSTUMER;
      if (!user) {
        user = await User.findDeliverymanByEmail(email);
        typeofUser = TypeOfUser.DELIVERYMAN;
        if (!user) {
          user = await User.findMarketerByEmail(email);
          typeofUser = TypeOfUser.MARKETER;
        }
      }

      if (!user) {
        return rep.status(404).send({
          error: true,
          message: 'The user if this email doesnt exist!',
        });
      }

      const isValid = await checkPassword(password, user.password_hash);

      if (!isValid) {
        return rep
          .status(401)
          .send({ error: true, message: 'The password is wrong' });
      }

      // @ts-ignore
      user.typeof = typeofUser;

      const data = { payload: user };

      const token = server.jwt.sign(data);

      return rep.send({ token, error: false });
    },
  );
}
