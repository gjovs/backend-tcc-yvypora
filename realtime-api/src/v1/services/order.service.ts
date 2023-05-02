import { db } from "../libs";

class OrderService {
  async get(intent_payment_id: string) {
    const res = await db.order.findUnique({
      where: {
        intent_payment_id,
      },
      include: {
        deliveryman: {
          include: {
            gender: true,
          },
        },
        costumer_addresses: {
          include: {
            address: {
              include: {
                location: true,
              },
            },
          },
        },
        shopping_list: {
          include: {
            costumer: {
              include: {
                gender: true,
              },
            },
            products_in_shopping_list: {
              include: {
                product: {
                  include: {
                    image_of_product: {
                      include: {
                        image: true,
                      },
                    },
                    marketer: {
                      include: {
                        location: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    console.info(res);

    return res;
  }

  async addDeliveryman(data: {
    intent_payment_id: string;
    deliverymanId: number;
  }) {
    try {
      await db.order.update({
        where: { intent_payment_id: data.intent_payment_id },
        data: {
          accepted_status: true,
          deliveryman: {
            connect: {
              id: data.deliverymanId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async retreatOfProducsCompleted(id: number) {
    await db.order.update({
      where: {
        id,
      },
      data: {
        retreat_products_status: true,
      },
    });
  }

  async acceptOrder(id: number) {
    await db.order.update({
      where: {
        id,
      },
      data: {
        delivered_status_for_client: true,
      },
    });
  }
}

export default new OrderService();
