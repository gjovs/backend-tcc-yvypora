import { FastifyInstance, FastifyRequest } from 'fastify';
import bcryptjs from 'bcryptjs';
import { User } from '../models';
import { checkPassword } from '../utils/utils';

enum TypeOfUser {
  COSTUMER= 'COSTUMER',
  MARKETER = 'MARKETER',
  DELIVERYMAN = 'DELIVERYMAN'
}

export default async function loginPlugin(server: FastifyInstance) {
  server.post('/', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password', 'typeOfUser'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
          typeOfUser: {
            enum: ['COSTUMER', 'MARKETER', 'DELIVERYMAN'],
          },
        },
      },
    },
  }, async (req:FastifyRequest<{
    Body: {
      email: string,
      password: string,
      typeOfUser: TypeOfUser
    }
  }>, rep) => {
    const { email, password, typeOfUser } = req.body;

    let user;

    if (typeOfUser === TypeOfUser.COSTUMER) {
      user = await User.findCostumerByEmail(email);
    }

    if (typeOfUser === TypeOfUser.DELIVERYMAN) {
      user = await User.findDeliverymanByEmail(email);
    }

    if (typeOfUser === TypeOfUser.MARKETER) {
      user = await User.findMarketerByEmail(email);
    }

    if (!user) return rep.status(404).send({ error: true, message: ['The user if this email doesnt exist!'] });
    const isValid = await checkPassword(password, user.password_hash);
    if (!isValid) return rep.status(401).send({ error: true, message: ['The password is wrong'] });

    const data = { payload: user };

    const token = server.jwt.sign(data);

    return rep.send({ token, error: false });
  });
}
