import { FastifyInstance, FastifyRequest } from 'fastify';
import { User } from '../models';
import { TypeOfUser } from '../models/utils/enums';

export default async function picturePlugin(server: FastifyInstance) {
  // reference the user costumer or marketer
  server.put('/:id/', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          userType: {
            type: 'string',
            default: 'COSTUMER',
          },
        },
      },
    },
  }, async (req: FastifyRequest<{
    Querystring: {
      userType: string
    },
    Params: {
      id: string
    }
  }>, rep) => {
    const { id } = req.params;
    const { userType } = req.query;

    const parsedId = parseInt(id, 10);

    let status;

    // TODO Connect service of firebase to get image in cloud
    if (userType.toUpperCase() === TypeOfUser.COSTUMER) {
      const user = await User.findCostumerById(parsedId);
      if (!user) return rep.status(404).send({ error: true, message: ['id is wrong user not founded'] });

      const picture_uri = 'https://static.wikia.nocookie.net/fiction-battlefield/images/4/4c/Po_icon.png/revision/latest/scale-to-width-down/386?cb=20181124162510&path-prefix=pt-br';

      status = await User.updatePhotoCostumer({ id: parsedId, picture_uri });
    }

    if (userType.toUpperCase() === TypeOfUser.MARKETER) {
      const user = await User.findMarketerById(parsedId);
      if (!user) return rep.status(404).send({ error: true, message: ['id is wrong user not founded'] });

      const picture_uri = 'https://static.wikia.nocookie.net/fiction-battlefield/images/4/4c/Po_icon.png/revision/latest/scale-to-width-down/386?cb=20181124162510&path-prefix=pt-br';

      status = await User.updatePhotoMarketer({ id: parsedId, picture_uri });
    }

    if (userType.toUpperCase() === TypeOfUser.DELIVERYMAN) {
      const user = await User.findDeliverymanById(parsedId);
      if (!user) return rep.status(404).send({ error: true, message: ['id is wrong user not founded'] });

      const picture_uri = 'https://static.wikia.nocookie.net/fiction-battlefield/images/4/4c/Po_icon.png/revision/latest/scale-to-width-down/386?cb=20181124162510&path-prefix=pt-br';

      status = await User.updatePhotoDeliveryman({ id: parsedId, picture_uri });
    }

    if (!status) return rep.status(401).send({ error: true, message: ['Cant update the image for this user'] });

    return rep.send({
      error: false,
      message: ['Updated Image of the User'],
    });
  });
}
