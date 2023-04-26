import db from '../libs/prisma';

class FairRepository {
  async index() {
    const res = await db.fair.findMany({
      include: {
        location: true,
      },
    });
    await Promise.all(res.map(async (idx, data) => {
      // @ts-ignore
      const counter = await db.fair_marketers.count({ where: { fairId: data.id } });

      // @ts-ignore
      // res[idx].marketer_count = counter;
    }));

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
