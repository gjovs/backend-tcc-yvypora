import db from '../libs/prisma';

class LocationService {
  async updateLocation(data: { lat: number, long: number, id: number}) {
    await db.location.update({
      where: {
        id: data.id,
      },
      data: {
        latitude: data.lat,
        longitude: data.long,
      },
    });
  }
}

export default new LocationService();
