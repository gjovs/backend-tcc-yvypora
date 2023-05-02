import db from "../libs/prisma";

class OrderService {
  async get(intent_payment_id: string) {
    try {
      const res = await db.order.findUnique({
        where: { intent_payment_id },
        include: {
          costumer_addresses: {
            include: {
              address: {
                include: {
                  city: true,
                  neighborhood: true,
                  uf: true,
                },
              },
            },
          },
          shopping_list: {
            include: {
              products_in_shopping_list: {
                include: {
                  product: {
                    include: {
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

      return res;
    } catch (e) {
      return false;
    }
  }

  async createIntent(data: {
    total: number;
    freight: number;
    costumer: {
      id: number;
      address_id: number;
    };
    products: { id: number; amount: number }[];
    intent_payment_id: string;
  }) {
    try {
      const order = await db.order.create({
        data: {
          intent_payment_id: data.intent_payment_id,
          shopping_list: {
            create: {
              costumerId: data.costumer.id,
              total: data.total,
              freight: data.freight,
            },
          },
          costumer_addresses: {
            connect: {
              id: data.costumer.address_id,
            },
          },
        },
      });

      await db.products_in_shopping_list.createMany({
        data: data.products.map((item) => ({
          productId: item.id,
          shopping_listId: order.shopping_listId,
        })),
      });

      return true;
    } catch (e) {
      if (e instanceof Error) {
        return false;
      }
    }
  }

  async updatePaymentStatus(
    status: boolean,
    payment_details: string,
    intent_payment_id: string
  ) {
    try {
      await db.order.update({
        where: { intent_payment_id },
        data: {
          payment: {
            create: {
              status,
              payment_method: {
                connect: {
                  id: 1, // CREDIT CARD
                },
              },
              details: payment_details,
            },
          },
        },
      });

      return true;
    } catch (e) {
      return false;
    }
  }

  async getLast() {
    const lastOrder = await db.order.groupBy({
      orderBy: {
        created_at: "desc",
      },
      take: 1,
      by: ["created_at", "id", "intent_payment_id"],
    });
    

    return lastOrder[0];
  }
}

export default new OrderService();
