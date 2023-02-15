import db from '../libs/prisma';

class Costumer {
  async createCostumer(data: {
    password: string,
    name: string,
    email: string,
    gender: number
    address: {
      cep: number,
      complemento: string,
      addressTypeId: number,
      number: number
    }
  }) {
    try {
      const res = await db.costumer.create({
        data: {
          gender: {
            connect: {
              id: data.gender,
            },
          },
          name: data.name,
          password_hash: data.password,
          email: data.email,
          costumer_addresses: {
            create: {
              address: {
                create: {
                  number: data.address.number,
                  complemento: data.address.complemento,
                  CEP: data.address.cep,
                  address_typeId: data.address.addressTypeId,
                },
              },
            },
          },
        },
        select: {
          gender: {
            select: {
              name: true,
            },
          },
          name: true,
          email: true,
          costumer_addresses: {
            include: {
              address: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });

      return { data: res, error: false };
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: true, message: 'Failed to save a new Costumer in Database', code: 401,
        };
      }
    }
  }
}

export default new Costumer();
