import db from '../libs/prisma';

class FairService {
  async index() {
    const fairs = await db.fair.findMany({
      select: {
        fair_date_hour_of_work: {
          include: {
            dates: {
              include: {
                day_of_week: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
        fair_marketers: {
          include: {
            marketer: {
              include: {
                location: true,
                gender: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
        address: {
          include: {
            type: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return fairs;
  }

  async get(id: number) {
    const fair = await db.fair.findUnique({
      where: {
        id,
      },
      select: {
        fair_date_hour_of_work: {
          include: {
            dates: {
              include: {
                day_of_week: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
        fair_marketers: {
          include: {
            marketer: {
              include: {
                products: {
                  include: {
                    image_of_product: true,
                  },
                },
                location: true,
                gender: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
        address: {
          include: {
            type: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
    return fair;
  }
}

export default new FairService();
