import db from '../libs/prisma';

interface IAdress {
  cep: string,
  complemento: string,
  addressTypeId: number,
  number: number,
  city: string,
  uf: string,
  neighborhood: string,
  logradouro: string
}
class Costumer {
  async getCostumer(id: number) {
    try {
      const res = await db.costumer.findUnique({
        where: { id },
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
        return { error: true, message: 'Failed to delete this costumer' };
      }
    }
  }

  async createCostumer(data: {
    password: string,
    name: string,
    email: string,
    gender: number
    address: IAdress
  }) {
    try {
      // @ts-ignore
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
                  cep: data.address.cep,
                  type: {
                    connect: {
                      id: data.address.addressTypeId,
                    },
                  },
                  uf: {
                    connectOrCreate: {
                      where: {
                        name: data.address.uf,
                      },
                      create: {
                        name: data.address.uf,
                      },
                    },
                  },
                  city: {
                    connectOrCreate: {
                      where: {
                        name: data.address.city,
                      },
                      create: {
                        name: data.address.city,
                      },
                    },
                  },
                  neighborhood: {
                    connectOrCreate: {
                      create: {
                        name: data.address.neighborhood,
                      },
                      where: {
                        name: data.address.neighborhood,
                      },
                    },
                  },
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
      const addresses = await db.costumer_addresses.findMany({
        where: {
          costumerId: id,
        },
        select: {
          addressId: true,
        },
      });

      // @ts-ignore
      await Promise.all(addresses.map(async ({ addressId }) => {
        // @ts-ignore
        await db.address.delete({ where: { id: addressId as number } });
      }));

      await db.costumer.delete({ where: { id } });
      return { error: false, data: 'Success Deleted' };
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, message: 'Failed to delete this costumer' };
      }
    }
  }

  async updateCostumer(data: { id: number, name: string, genderId: number, email: string, password_hash: string | null }) {
    try {
      if (data.password_hash) {
        await db.costumer.update({
          where: { id: data.id },
          data: { password_hash: data.password_hash },
        });
      }

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

  async addNewCostumerAddress(data: { address: IAdress, id: number }) {
    try {
      await db.costumer.update({
        where: { id: data.id },
        data: {
          costumer_addresses: {
            create: {
              address: {
                create: {
                  type: {
                    connect: {
                      id: data.address.addressTypeId,
                    },
                  },
                  cep: data.address.cep,
                  complemento: data.address.complemento,
                  number: data.address.number,
                  uf: {
                    connectOrCreate: {
                      where: {
                        name: data.address.uf,
                      },
                      create: {
                        name: data.address.uf,
                      },
                    },
                  },
                  city: {
                    connectOrCreate: {
                      where: {
                        name: data.address.city,
                      },
                      create: {
                        name: data.address.city,
                      },
                    },
                  },
                  neighborhood: {
                    connectOrCreate: {
                      create: {
                        name: data.address.neighborhood,
                      },
                      where: {
                        name: data.address.neighborhood,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      return { error: false, message: 'Success appended new address to costumer', code: 401 };
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
