import db from '../libs/prisma';

class OrderService {
  async createIntent(data: {
    total: number,
    freight: number,
    costumer: {
      id: number,
      address_id: number
    },
    products: {id: number, amount: number}[]
  }) {
    try {
      const order = await db.order.create({
        data: {
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
}

export default new OrderService();
