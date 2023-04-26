import { FastifyReply, FastifyRequest } from "fastify";
import { getGender, hashPassword, isValidDate } from "../utils/utils";
import { MarketerRepository, UserRepository } from "../repositories";
import { genToken } from "../utils/utils";
import { IMarketer } from "../dao/models/marketer";

export class MarketerController {
  async create(
    req: FastifyRequest<{
      Body: IMarketer;
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
      tent_name,
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

    const password_hash = await hashPassword(password as string);

    const genderId = getGender(gender as string);

    const data = {
      location,
      email,
      name,
      password: password_hash,
      phone,
      gender: genderId,
      birthday,
      tent_name,
    };

    const res = await MarketerRepository.createMarketer(data);

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

    const res = await MarketerRepository.delete(parseInt(id, 10));

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
      Body: IMarketer;
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      cpf,
      cnpj,
      gender,
      birthday,
      tent_name,
      phone,
    } = req.body;

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

    const res = await MarketerRepository.update({
      id: parseInt(id, 10),
      cnpj: newCnpj,
      cpf: newCpf,
      password: newPassword,
      email,
      tent_name,
      name,
      birthday,
      phone,
    });

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    const newDetails = await UserRepository.findMarketerByEmail(email);

    const newToken = genToken({
      payload: { ...newDetails, typeof: "MARKETER" },
    });

    return rep.send({ message: res?.message, newToken });
  }
}

export default new MarketerController();
