import { FastifyReply, FastifyRequest } from 'fastify';
import { Fair, Picture, Product } from '../services';
import FirebaseService from '../services/firebase.service';

export class PictureController {
  async addInFair(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
      Body: {
        picture: any;
      };
    }>,
    rep: FastifyReply,
  ) {
    const { picture } = req.body;
    const { id } = req.params;

    await picture.toBuffer();

    const uri = await FirebaseService.uploadImage(picture);

    const res = await Fair.appendPicture(parseInt(id, 10), uri);

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        code: res.code,
        message: res.message,
        error: true,
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: res?.message,
    });
  }

  async addInProduct(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
      Body: {
        picture: any;
      };
    }>,
    rep: FastifyReply,
  ) {
    const { picture } = req.body;

    await picture.toBuffer();

    const picture_uri = await FirebaseService.uploadImage(picture);

    const res = await Product.appendPicture(
      parseInt(req.params.id, 10),
      picture_uri,
    );

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        code: res.code,
        message: res.message,
        error: true,
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: res?.message,
    });
  }

  async delete(
    req: FastifyRequest<{
      Params: {
        id: string;
        pictureId: string
      };
    }>,
    rep: FastifyReply,
  ) {
    const res = await Picture.delete(parseInt(req.params.pictureId, 10));
    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        code: res.code,
        message: res.message,
        error: true,
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: res?.message,
    });
  }
}

export default new PictureController();
