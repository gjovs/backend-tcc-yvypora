import db from '../libs/prisma';

class Marketer {
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
      return { data: res, error: true };
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, error: true, code: 400 };
      }
    }
  }

  async removeFair(marketerId: number, fairId: number) {
    try {
      const findRelation = await db.fair_marketers.findMany({
        where: { marketerId, fairId },
      });

      await db.fair_marketers.delete({
        where: {
          id: findRelation[0].id,
        },
      });

      return { message: 'Succely removed relation with fair!', error: true };
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, error: true };
      }
    }
  }
}

export default new Marketer();
