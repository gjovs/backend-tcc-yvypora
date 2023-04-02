import { db } from "../libs";

class DeliverymanService {
  async status(online: boolean, id: number) {
    await db.deliveryman.update({
      where: { id },
      data: { online },
    });
  }
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
}

export default new DeliverymanService();
