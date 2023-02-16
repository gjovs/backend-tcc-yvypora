import db from '../libs/prisma';

class Marketer {
  async createMarketer(data: {
    email: string,
    genderId: number,
    name: string,
    password_hash: string,
    cpf?: string,
    cnpj?: string,
    phone: string,
    location: {
      latitude: number,
      longitude: number
    }
  }) {
    try {
      const res = await db.marketer.create({
        data: {
          gender: {
            connect: {
              id: data.genderId,
            },
          },
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          location: {
            create: {
              latitude: data.location.latitude,
              longitude: data.location.longitude,
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
        return {
          error: true, message: 'Failed to save a new Marketer in Database', code: 401,
        };
      }
    }
  }
}

export default new Marketer();
