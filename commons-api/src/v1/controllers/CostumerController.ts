import { FastifyReply, FastifyRequest } from 'fastify';
import { hashPassword, isValidDate } from '../utils/utils';
import { Costumer } from '../services';

export class CostumerController {
  async create(
    req: FastifyRequest<{
      Body: {
        password: string;
        name: string;
        email: string;
        gender: string;
        birthday: string;
        address: {
          cep: string;
          complemento: string;
          addressTypeId: number;
          number: number;
          city: string;
          uf: string;
          neighborhood: string;
          logradouro: string;
        };
      };
    }>,
    rep: FastifyReply,
  ) {
    const { body } = req;

    const {
      name, email, password, address, gender, birthday,
    } = body;

    if (!isValidDate(birthday)) {
      return rep.status(400).send({
        code: 400,
        error: true,
        message:
          'Date format to attribute birthday is wrong, need to be yyyy-mm-dd',
      });
    }

    // male Default
    let genderId = 1;

    // female id
    if (gender.toUpperCase() === 'F') genderId = 2;

    const password_hash = await hashPassword(password);

    const res = await Costumer.createCostumer({
      name,
      email,
      password: password_hash,
      address,
      gender: genderId,
      birthday,
    });

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.data);
  }

  async update(
    req: FastifyRequest<{
      Body: {
        name: string;
        email: string;
        password: string;
        gender: string;
        birthday: string;
      };
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply,
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

    let genderId = 1;

    // female id
    if (body.gender.toUpperCase() === 'F') genderId = 2;

    const res = await Costumer.updateCostumer({
      name: body.name,
      password_hash,
      email: body.email,
      id: parseInt(id, 10),
      genderId,
      birthday: body.birthday,
    });

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.data);
  }

  async delete(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply,
  ) {
    const { id } = req.params;

    const exists = await Costumer.getCostumer(parseInt(id, 10));

    // @ts-ignore
    if (!exists.data) {
      return rep.status(404).send({
        error: true,
        message: 'This costumer do not exist',
      });
    }

    const res = await Costumer.deleteCostumer(parseInt(id, 10));

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }
    return rep.send(res?.data);
  }
}

export default new CostumerController();