import { FastifyReply, FastifyRequest } from "fastify";
import { TypeOfUser } from "../services/utils/enums";
import { User } from "../services";
import FirebaseService from "../services/firebase.service";

export class PictureController {
  async appendToUser(
    req: FastifyRequest<{
      Body: {
        picture: any;
      };
    }>,
    rep: FastifyReply
  ) {
    // @ts-ignore
    const { id } = req.user;

    // @ts-ignore
    const userType = req.user.typeof;

    // @ts-ignore
    const { picture } = req.body;

    // TODO convert base64 to png again

    await picture.toBuffer();

    let status;

    if (userType === TypeOfUser.COSTUMER) {
      const user = await User.findCostumerById(id);

      if (!user) {
        return rep
          .status(404)
          .send({ error: true, message: ["id is wrong user not founded"] });
      }

      const picture_uri = await FirebaseService.uploadImage(picture);

      status = await User.updatePhotoCostumer({ id, picture_uri });
    }

    if (userType === TypeOfUser.MARKETER) {
      const user = await User.findMarketerById(id);

      if (!user) {
        return rep
          .status(404)
          .send({ error: true, message: ["id is wrong user not founded"] });
      }

      const picture_uri = await FirebaseService.uploadImage(picture);

      status = await User.updatePhotoMarketer({ id, picture_uri });
    }

    if (userType === TypeOfUser.DELIVERYMAN) {
      const user = await User.findDeliverymanById(id);

      if (!user) {
        return rep
          .status(404)
          .send({ error: true, message: ["id is wrong user not founded"] });
      }

      const picture_uri = await FirebaseService.uploadImage(picture);

      status = await User.updatePhotoDeliveryman({ id, picture_uri });
    }

    if (!status) {
      return rep.status(401).send({
        error: true,
        message: ["Cant update the image for this user"],
      });
    }

    return rep.send({
      error: false,
      message: "Updated Image of the User",
      code: 200,
    });
  }
}

export default new PictureController();
