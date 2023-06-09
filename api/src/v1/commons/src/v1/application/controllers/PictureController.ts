import { FastifyReply, FastifyRequest } from 'fastify';
import { TypeOfUser } from '../../domain/dto/TypeOfUser';
import { UserRepository } from '../../domain/repositories';
import { FirebaseService } from '../../infrastructure/services';
import { IPictureController } from '../../interfaces/controllers.interface';

export class PictureController implements IPictureController {
  async appendToUser(
    req: FastifyRequest<{ Body: { picture: any } }>,
    rep: FastifyReply
  ) {
    const decodedToken = req.user;
    const { id, typeof: userType } = decodedToken;
    const { picture } = req.body;
    try {
      await picture.toBuffer();

      const updateUserPhoto = async (findFn: Function, updateFn: Function, userId: number) => {
        const user = await findFn(userId);

        if (!user) {
          throw new Error('User not found');
        }

        const picture_uri = await FirebaseService.uploadImage(picture);

        console.log(picture_uri);

        const status = await updateFn({ id, picture_uri });

        if (!status) {
          throw new Error("Unable to update the user's photo");
        }

        console.log(user, picture_uri, status);

        return {
          error: false,
          message: 'Updated image of the user',
          code: 200,
        };
      };

      if (userType === TypeOfUser.COSTUMER) {
        return rep.send(
          await updateUserPhoto(
            UserRepository.findCostumerById,
            UserRepository.updatePhotoCostumer,
            id
          )
        );
      }

      if (userType === TypeOfUser.MARKETER) {
        return rep.send(
          await updateUserPhoto(
            UserRepository.findMarketerById,
            UserRepository.updatePhotoMarketer,
            id
          )
        );
      }

      if (userType === TypeOfUser.DELIVERYMAN) {
        return rep.send(
          await updateUserPhoto(
            UserRepository.findDeliverymanById,
            UserRepository.updatePhotoDeliveryman,
            id
          )
        );
      }

      throw new Error('Invalid user type');
    } catch (error) {
      if (error instanceof Error) {
        rep.status(400).send({ error: true, message: error.message });
      }
    }
  }
}

export default new PictureController();
