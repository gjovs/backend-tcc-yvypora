import db from "../libs/prisma";

class SearchService {
  async searchForProducts(
    context: string,
    date: { dayOfWeek: string; hour: string }
  ) {
    const data = new Date(`1900-01-01T${date.hour}:00:00.000Z`);

    const res = await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              search: context,
            },
          },
          {
            description: {
              search: context,
            },
          },
        ],
        AND: [
          {
            marketer: {
              fair_marketers: {
                some: {
                  fair: {
                    fair_date_hour_of_work: {
                      some: {
                        dates: {
                          day_of_week: {
                            name: date.dayOfWeek,
                          },
                          close_datetime: {
                            gte: data,
                          },
                          open_datetime: {
                            lte: data,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        _count: true,
        image_of_product: {
          include: {
            image: true,
          },
        },
      },
    });

    return res;
  }

  async searchForMarketers(context: string) {
    const marketers = await db.marketer.findMany({
      where: {
        name: {
          search: context,
        },
      },
      select: {
        name: true,
        picture_uri: true,
        review: true,
        online: true,
        location: true,
        gender: true,
      },
    });

    return marketers;
  }

  async searchForFairs(context: string) {
    const fairs = await db.fair.findMany({
      where: {
        name: {
          search: context,
        },
      },
      include: {
        _count: true,
      },
    });

    return fairs;
  }
}

export default new SearchService();
