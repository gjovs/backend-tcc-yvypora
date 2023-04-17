import { FastifyReply, FastifyRequest } from "fastify";
import { hashPassword, isValidDate } from "../utils/utils";
import { Marketer } from "../services";

export class MarketerController {
  async create(
    req: FastifyRequest<{
      Body: {
        name: string;
        cnpj: string;
        cpf: string;
        email: string;
        password: string;
        phone: string;
        birthday: string;
        location: {
          longitude: number;
          latitude: number;
        };
        gender: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const {
      cpf,
      cnpj,
      gender,
      email,
      name,
      password,
      location,
      phone,
      birthday,
    } = req.body;

    if (!isValidDate(birthday)) {
      return rep.status(400).send({
        code: 400,
        error: true,
        message:
          "Date format to attribute birthday is wrong, need to be yyyy-mm-dd",
      });
    }

    if (!cnpj && !cpf) {
      return rep.status(401).send({
        error: true,
        message: ["It is required one field of identification (CPF or CNPJ)"],
        code: 401,
      });
    }

    const password_hash = await hashPassword(password);

    // male Default
    let genderId = 1;

    // female id
    if (gender.toUpperCase() === "F") genderId = 2;

    const data = {
      location,
      email,
      name,
      password_hash,
      phone,
      genderId,
      birthday,
    };

    const res = await Marketer.createMarketer(data);

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
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const res = await Marketer.delete(parseInt(id, 10));

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.message);
  }

  async update(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
      Body: {
        name: string;
        password: string | null;
        cpf: string | null;
        cnpj: string | null;
        email: string;
        gender: string;
        birthday: string;
        phone: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;
    const { name, email, password, cpf, cnpj, gender, birthday, phone } =
      req.body;

    if (birthday) {
      if (!isValidDate(birthday)) {
        return rep.status(400).send({
          code: 400,
          error: true,
          message:
            "Date format to attribute birthday is wrong, need to be yyyy-mm-dd",
        });
      }
    }

    let newCnpj = null;
    let newCpf = null;
    let newPassword = null;

    if (password) {
      newPassword = await hashPassword(password);
    }

    if (cnpj) newCnpj = cnpj;
    if (cpf) newCpf = cpf;

    const res = await Marketer.update({
      id: parseInt(id, 10),
      cnpj: newCnpj,
      cpf: newCpf,
      password_hash: newPassword,
      email,
      name,
      phone,
      birthday,
    });

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.message);
  }
}

export default new MarketerController();
