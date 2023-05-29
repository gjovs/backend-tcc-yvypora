import db from "../../infrastructure/libs/prisma";

class FairRepository {
  async index() {
    const res = await db.fair.findMany({
      include: {
        image: true,
        location: true,
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
      },
    });
    await Promise.all(
      res.map(async (data, idx) => {
        // @ts-ignore
        const counter = await db.fair_marketers.count({
          where: { fairId: data.id },
        });

        // @ts-ignore
        res[idx].marketer_count = counter;
      })
    );

    res.forEach((fair: any) => {
      const { latitude, longitude } = fair.location;

      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      delete fair.location;

      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      fair.latitude = latitude;

      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      fair.longitude = longitude;
    });

    return res;
  }
}

export default new FairRepository();
