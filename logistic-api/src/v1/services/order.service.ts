import { db } from "../libs";

class OrderService {
  async get(intent_payment_id: string) {
    const res = await db.order.findUnique({
      where: {
        intent_payment_id,
      },
      include: {
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
}

export default new OrderService();
