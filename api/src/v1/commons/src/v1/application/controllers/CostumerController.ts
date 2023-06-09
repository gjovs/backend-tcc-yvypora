import { FastifyReply, FastifyRequest } from 'fastify';
import {
  getGender,
  hashPassword,
  isValidDate,
  genToken,
} from '../../utils/utils';
import { OsmService } from '../../infrastructure/services';
import { CostumerRepository, UserRepository } from '../../domain/repositories';
import ICostumer from '../../domain/models/costumer';
import IAddress from '../../domain/models/address';
import DecodedToken from '../../domain/dto/DecodedToken';
import { ICostumerController } from '../../interfaces/controllers.interface';

export class CostumerController implements ICostumerController {
  async create(
    req: FastifyRequest<{
      Body: ICostumer<IAddress>;
    }>,
    rep: FastifyReply
  ) {
    const { body } = req;

    console.log(body);

    const { name, email, password, address, gender, birthday } = body;

    if (!isValidDate(birthday)) {
      return rep.status(400).send({
        code: 400,
        error: true,
        message:
          'Date format to attribute birthday is wrong, need to be yyyy-mm-dd',
      });
    }

    const genderId = getGender(gender as string);

    const password_hash = await hashPassword(password);

    const addressWithLocation = await OsmService.getGeocoding(address);

    if (!addressWithLocation) {
      return rep.status(400).send({
        code: 400,
        error: true,
        message: 'This address is not valid to be saveable',
      });
    }

    const res = await CostumerRepository.createCostumer({
      name,
      email,
      password: password_hash,
      address: { ...addressWithLocation, addressTypeId: 2 },
      gender: genderId,
      birthday,
      cpf: '',
    });

    if (res?.error) {
      return rep.status(res?.code ? res.code : 400).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.data);
  }

  async update(
    req: FastifyRequest<{
      Body: ICostumer<IAddress>;
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;
    const { body } = req;

    let password_hash = null;

    if (body.password) {
      password_hash = await hashPassword(body.password);
    }

    if (body.birthday) {
      if (!isValidDate(body.birthday)) {
        return rep.status(400).send({
          code: 400,
          error: true,
          message:
            'Date format to attribute birthday is wrong, need to be yyyy-mm-dd',
        });
      }
    }

    const res = await CostumerRepository.updateCostumer({
      name: body.name,
      password_hash,
      email: body.email,
      id: parseInt(id, 10),
      birthday: body.birthday,
      cpf: body.cpf,
    });

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    const newDetails = await UserRepository.findCostumerById(parseInt(id, 10));

    const newToken = genToken({
      payload: { ...newDetails, typeof: 'COSTUMER' },
    });

    return rep.send({ data: { ...res?.data, newToken } });
  }

  async delete(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const exists = await CostumerRepository.getCostumer(parseInt(id, 10));

    // @ts-ignore
    if (!exists.data) {
      return rep.status(404).send({
        error: true,
        message: 'This costumer do not exist',
      });
    }

    const res = await CostumerRepository.deleteCostumer(parseInt(id, 10));

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }
    return rep.send(res?.data);
  }

  async listAddress(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.user;
    const addresses = await CostumerRepository.listAddress(id);
    return addresses;
  }
}

export default new CostumerController();
