import db from '../libs/prisma';

class Fair {
  async index() {
    const res = await db.fair.findMany({
      include: {
        location: true,
      },
    });

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

export default new Fair();
