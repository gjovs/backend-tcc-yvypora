import { IMarketer } from "../dao/models/marketer";
import db from "../libs/prisma";

class MarketerRepository {
  async createMarketer(data: IMarketer) {
    try {
      const res = await db.marketer.create({
        data: {
          tent_name: data.tent_name as string,
          gender: {
            connect: {
              id: data.gender as number,
            },
          },
          birthday: data.birthday,
          name: data.name,
          email: data.email,
          password_hash: data.password as string,
          location: {
            create: {
              latitude: data.location?.latitude as number,
              longitude: data.location?.longitude as number,
            },
          },
          cpf: data?.cpf,
          cnpj: data?.cnpj,
          phone: data.phone,
        },
        select: {
          gender: {
            select: {
              name: true,
            },
          },
          name: true,
          email: true,
          location: {
            select: {
              latitude: true,
              longitude: true,
            },
          },
          picture_uri: true,
        },
      });

      return { data: res, error: false };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return {
          error: true,
          message: "Failed to save a new MarketerService in Database",
          code: 401,
        };
      }
    }
  }

  async delete(id: number) {
    try {
      await db.marketer.delete({ where: { id } });
      return { error: false, message: "Success deleted marketer!" };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return { error: true, message: "Failed to delete marketer", code: 401 };
      }
    }
  }

  async update(data: IMarketer) {
    try {
      if (data.password) {
        await db.marketer.update({
          where: {
            id: data.id,
          },
          data: {
            password_hash: data.password,
          },
        });
      }
      await db.marketer.update({
        where: { id: data.id },
        data: {
          name: data.name,
          email: data.email,
          cnpj: data.cnpj,
          cpf: data.cpf,
          birthday: data.birthday,
          tent_name: data.tent_name,
          phone: data.phone,
        },
      });

      return { error: false, message: "Success updated marketer!" };
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return { error: true, message: "Failed to update marketer", code: 401 };
      }
    }
  }
}

export default new MarketerRepository();
