import { db } from "../libs";

class DeliverymanService {
  async listByOnline() {
    const res = await db.deliveryman.findMany({
      where: {
        online: true,
      },
      include: {
        location: true,
        veicule_deliveryman: {
          include: { veicule: true },
        },
      },
    });

    return res;
  }

  async get(id: number) {
    const res = await db.deliveryman.findUnique({
      where: {
        id,
      },
      include: {
        location: true,
        veicule_deliveryman: {
          include: { veicule: true },
        },
      },
    });
    return res;
  }

  async updateLocation(id: number, location: { latitude: number, longitude: number}) {
    await db.deliveryman.update({
      where: {
        id
      },
      data: {
        location: {
          update: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        }
      }
    })
  }
}

export default new DeliverymanService();
