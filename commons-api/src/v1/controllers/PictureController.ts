import { FastifyReply, FastifyRequest } from "fastify";
import { TypeOfUser } from "../services/utils/enums";
import { UserRepository } from "../repositories";
import FirebaseService from "../services/firebase.service";
import DecodedToken from "../dao/dto/DecodedToken";

export class PictureController {
  async appendToUser(
    req: FastifyRequest<{ Body: { picture: any } }>,
    rep: FastifyReply
  ) {
    const decodedToken = req.user as DecodedToken;
    const { id, typeof: userType } = decodedToken;
    const { picture } = req.body;

    try {
      await picture.toBuffer();

      const updateUserPhoto = async (
        findFn: Function,
        updateFn: Function,
        userId: number
      ) => {
        const user = await findFn(userId);
        if (!user) {
          throw new Error("User not found");
        }

        const picture_uri = await FirebaseService.uploadImage(picture);

        const status = await updateFn(picture_uri);

        if (!status) {
          throw new Error("Unable to update the user's photo");
        }

        return {
          error: false,
          message: "Updated image of the user",
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

      throw new Error("Invalid user type");
    } catch (error) {
      if (error instanceof Error)
        rep.status(400).send({ error: true, message: error.message });
    }
  }
}

export default new PictureController();
