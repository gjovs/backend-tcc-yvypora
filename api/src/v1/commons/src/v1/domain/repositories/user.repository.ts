import db from "../../infrastructure/libs/prisma";

class UserRepository {
  async findCostumerByEmail(email: string) {
    const res = await db.costumer.findUnique({ where: { email } });
    return res;
  }

  async findDeliverymanByEmail(email: string) {
    const res = await db.deliveryman.findUnique({ where: { email } });
    return res;
  }

  async findMarketerByEmail(email: string) {
    const res = await db.marketer.findUnique({ where: { email } });
    return res;
  }

  async findMarketerById(id: number) {
    const res = await db.marketer.findUnique({
      where: { id },
      include: {
        gender: true,
        location: true,
      },
    });
    return res;
  }

  async findCostumerById(id: number) {
    try {
      const res = await db.costumer.findUnique({
        where: { id },
        include: {
          gender: true,
          costumer_addresses: {
            include: {
              address: {
                include: {
                  city: true,
                  location: true,
                  type: true,
                  uf: true,
                  neighborhood: true,
                },
              },
            },
          },
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findDeliverymanById(id: number) {
    const res = await db.deliveryman.findUnique({
      where: { id },
      include: {
        gender: true,
        location: true,
        veicule_deliveryman: {
          include: {
            veicule: true,
          },
        },
      },
    });
    return res;
  }

  async updatePhotoMarketer(data: { id: number; picture_uri: string }) {
    try {
      await db.marketer.update({
        where: { id: data.id },
        data: { picture_uri: data.picture_uri },
      });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: true,
          message: "Failed to update image of Marketer in Database",
          code: 401,
        };
      }
    }
  }

  async updatePhotoCostumer(data: { id: number; picture_uri: string }) {
    try {
      await db.costumer.update({
        where: { id: data.id },
        data: { picture_uri: data.picture_uri },
      });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        
        return {
          error: true,
          message: "Failed to update image of Costumer in Database",
          code: 401,
        };
      }
    }
  }

  async updatePhotoDeliveryman(data: { id: number; picture_uri: string }) {
    try {
      await db.deliveryman.update({
        where: { id: data.id },
        data: { picture_uri: data.picture_uri },
      });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: true,
          message: "Failed to update image of Marketer in Database",
          code: 401,
        };
      }
    }
  }
}
export default new UserRepository();
