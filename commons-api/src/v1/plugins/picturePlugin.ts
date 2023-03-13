import { FastifyInstance, FastifyRequest } from 'fastify';
import { User } from '../models';
import { TypeOfUser } from '../models/utils/enums';
import FirebaseService from '../services/firebase.service';

export default async function picturePlugin(server: FastifyInstance) {
  server.put(
    '/',
    {
      onRequest: [server.auth],
      schema: {
        body: {
          type: 'object',
          required: ['picture'],
          properties: {
            picture: {
              type: 'object',
            },
          },
        },
      },
    },
    async (
      req: FastifyRequest<{
        Body: {
          picture: any;
        };
      }>,
      rep,
    ) => {
      const { id } = req.user;

      const userType = req.user.typeof;

      // @ts-ignore
      const { picture } = req.body;

      await picture.toBuffer();

      let status;

      if (userType === TypeOfUser.COSTUMER) {
        const user = await User.findCostumerById(id);

        if (!user) {
          return rep
            .status(404)
            .send({ error: true, message: ['id is wrong user not founded'] });
        }

        const picture_uri = await FirebaseService.uploadImage(picture);

        status = await User.updatePhotoCostumer({ id, picture_uri });
      }

      if (userType === TypeOfUser.MARKETER) {
        const user = await User.findMarketerById(id);

        if (!user) {
          return rep
            .status(404)
            .send({ error: true, message: ['id is wrong user not founded'] });
        }

        const picture_uri = await FirebaseService.uploadImage(picture);

        status = await User.updatePhotoMarketer({ id, picture_uri });
      }

      if (userType === TypeOfUser.DELIVERYMAN) {
        const user = await User.findDeliverymanById(id);

        if (!user) {
          return rep
            .status(404)
            .send({ error: true, message: ['id is wrong user not founded'] });
        }

        const picture_uri = await FirebaseService.uploadImage(picture);

        status = await User.updatePhotoDeliveryman({ id, picture_uri });
      }

      if (!status) {
        return rep.status(401).send({
          error: true,
          message: ['Cant update the image for this user'],
        });
      }

      return rep.send({
        error: false,
        message: 'Updated Image of the User',
        code: 200,
      });
    },
  );
}
