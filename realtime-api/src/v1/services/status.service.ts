import { db } from "../libs/";

class StatusService {
  async deliveryman(online: boolean, id: number) {
    await db.deliveryman.update({
      where: { id },
      data: { online },
    });
  }

  async marketer(online: boolean, id: number) {
    await db.marketer.update({
      where: { id },
      data: { online },
    });
  }
}

export default new StatusService();
