import { FastifyInstance, FastifyRequest } from 'fastify';
import { User } from '../models';
import { TypeOfUser } from '../models/utils/enums';
import FirebaseService from '../services/firebase.service';

export default async function picturePlugin(server: FastifyInstance) {
  // reference the user costumer or marketer
  server.post('/:id/', {
    schema: {
      body: { type: 'object', required: ['picture'], properties: { picture: { type: 'object' } } },
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
    },
  }>, rep) => {
    const { id } = req.params;
    const { userType } = req.query;

    // @ts-ignore
    const { picture } = req.body;

    await picture.toBuffer();

    const parsedId = parseInt(id, 10);

    let status;

    // TODO Connect service of firebase to get image in cloud
    if (userType.toUpperCase() === TypeOfUser.COSTUMER) {
      const user = await User.findCostumerById(parsedId);

      if (!user) return rep.status(404).send({ error: true, message: ['id is wrong user not founded'] });

      const picture_uri = await FirebaseService.uploadImage(picture);

      status = await User.updatePhotoCostumer({ id: parsedId, picture_uri });
    }

    if (userType.toUpperCase() === TypeOfUser.MARKETER) {
      const user = await User.findMarketerById(parsedId);

      if (!user) return rep.status(404).send({ error: true, message: ['id is wrong user not founded'] });

      const picture_uri = await FirebaseService.uploadImage(picture);

      status = await User.updatePhotoMarketer({ id: parsedId, picture_uri });
    }

    if (userType.toUpperCase() === TypeOfUser.DELIVERYMAN) {
      const user = await User.findDeliverymanById(parsedId);

      if (!user) return rep.status(404).send({ error: true, message: ['id is wrong user not founded'] });

      const picture_uri = await FirebaseService.uploadImage(picture);

      status = await User.updatePhotoDeliveryman({ id: parsedId, picture_uri });
    }

    if (!status) return rep.status(401).send({ error: true, message: ['Cant update the image for this user'] });

    return rep.send({
      error: false,
      message: ['Updated Image of the User'],
    });
  });
}
