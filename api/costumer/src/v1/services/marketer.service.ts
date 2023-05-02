import db from '../libs/prisma';

export class MarketerService {
  async get(id: number) {
    const marketer = await db.marketer.findUnique({
      where: { id },
      include: {
        fair_marketers: {
          include: {
            fair: {
              select: {
                id: true,
                _count: true,
                fair_date_hour_of_work: {
                  include: {
                    dates: {
                      include: {
                        day_of_week: true,
                        fair_date_hour_of_work: true,
                      },
                    },
                  },
                },
                address: {
                  include: {
                    city: true,
                    neighborhood: true,
                    uf: true,
                  },
                },
              },
            },
          },
        },
        products: {
          include: {
            image_of_product: { include: { image: true } },
            sale_off: true,
          },
        },
      },
    });

    return marketer;
  }
}

export default new MarketerService();
