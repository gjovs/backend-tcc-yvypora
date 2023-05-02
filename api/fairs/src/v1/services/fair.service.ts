import db from "../libs/prisma";
import address from "../utils/interfaces/address.interface";

class Fair {
  async create(data: {
    name: string;
    address: address;
    dateAndHourOfWork: {
      open: string;
      close: string;
      dayOfWeek: {
        name: string;
        id: number;
      };
    }[];
  }) {
    try {
      const res = await db.fair.create({
        data: {
          name: data.name,
          location: {
            create: {
              latitude: data.address.latitude,
              longitude: data.address.longitude,
            },
          },
          address: {
            create: {
              logradouro: '',
              location: {
                create: {
                  latitude: data.address.latitude,
                  longitude: data.address.longitude,
                },
              },
              cep: data.address.cep,
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
              complemento: data.address.complemento,
              type: {
                connect: { id: 
                  5 },
              },
              number: data.address.number,
            },
          },
        },
      });

      const dateRelations = await Promise.all(
        data.dateAndHourOfWork.map(async (date) => {
          const relation = await db.date_and_hour_of_work.create({
            data: {
              day_of_weekId: date.dayOfWeek.id,
              open_datetime: date.open,
              close_datetime: date.close,
            },
          });
          return relation;
        })
      );

      await Promise.all(
        dateRelations.map(async (rel) => {
          await db.fair_date_hour_of_work.create({
            data: {
              fairId: res.id,
              date_and_hour_of_workId: rel.id,
            },
          });
        })
      );

      return {
        error: false,
        message: "Successfully saved a new fair",
        payload: res,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return { error: true, message: error.message, code: 400 };
      }
    }
  }

  async getByCep(cep: string) {
    const res = await db.fair.findMany({
      where: {
        address: {
          cep,
        },
      },
    });

    return res;
  }

  async appendPicture(id: number, uri: string) {
    try {
      await db.image.create({ data: { uri, fairId: id } });
      return {
        error: false,
        message: "Successfully appended image to product",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, code: 401, message: error.message };
      }
    }
  }
}

export default new Fair();
