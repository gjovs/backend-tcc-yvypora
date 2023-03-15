import db from '../libs/prisma';
import Fair from './fair.service';

class Marketer {
  async get(id: number) {
    const res = await db.marketer.findUnique({ where: { id } });

    return res;
  }

  async indexFairs(id: number) {
    try {
      const res = await db.fair_marketers.findMany({
        where: {
          marketerId: id,
        },
        include: {
          fair: {
            include: {
              location: true,
              fair_date_hour_of_work: {
                include: {
                  dates: {
                    include: {
                      day_of_week: true,
                    },
                  },
                },
              },
              address: {
                include: {
                  type: true,
                  city: true,
                  uf: true,
                  neighborhood: true,
                },
              },
            },
          },
        },
      });

      return res;
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, messaeg: 'Bad id', code: 401 };
      }
    }
  }

  async addFair(marketerId: number, fairId: number) {
    try {
      const res = await db.marketer.update({
        where: {
          id: marketerId,
        },
        select: {
          fair_marketers: true,
          id: true,
        },
        data: {
          fair_marketers: {
            create: {
              fairId,
            },
          },
        },
      });
      return { data: res, error: false };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return { message: error.message, error: true, code: 400 };
      }
    }
  }

  async removeFair(marketerId: number, fairId: number) {
    try {
      console.log(marketerId, fairId);

      const findRelation = await db.fair_marketers.findMany({
        where: {
          AND: [
            {
              fairId,
            },
            {
              marketerId,
            },
          ],
        },
      });

      await db.fair_marketers.delete({
        where: {
          id: findRelation[0].id,
        },
      });

      return { message: 'Succely removed relation with fair!', error: false };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return { message: error.message, error: true, code: 401 };
      }
    }
  }
}

export default new Marketer();
