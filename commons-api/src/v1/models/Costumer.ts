import { address } from '@prisma/client';
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

  // TODO create a sql script to delete in cascade to save process in DB
  async deleteCostumer(id: number) {
    try {
      await db.costumer.delete({ where: { id } });
      return { error: false, message: 'Success Deleted' };
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, message: 'Failed to delete this costumer' };
      }
    }
  }

  async updateCostumer(data: { id: number, name: string, genderId: number, email: string }) {
    try {
      const res = await db.costumer.update({
        where: { id: data.id },
        data: {
          name: data.name,
          email: data.email,
          genderId: data.genderId,
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
      return { error: false, data: res };
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, message: 'Failed to update this costumer', code: 401 };
      }
    }
  }

  async addNewCostumerAddress(data: { address: address, id: number }) {
    try {
      await db.costumer.update({
        where: { id: data.id },
        data: {
          costumer_addresses: {
            create: {
              address: {
                create: {
                  CEP: data.address.CEP,
                  address_typeId: data.address.address_typeId,
                  complemento: data.address.complemento,
                  number: data.address.number,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, message: 'Failed to append new address in this costumer', code: 401 };
      }
    }
  }

  async deleteCostumerAddress(addressId: number) {
    try {
      await db.address.delete({ where: { id: addressId } });
      return { error: false, message: 'Deleted address associated with this user' };
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, message: 'Failed to delete this address' };
      }
    }
  }
}

export default new Costumer();
