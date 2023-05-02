import {
  order,
  product,
  products_in_shopping_list,
  shopping_list,
} from '@prisma/client';

import db from '../libs/prisma';

type IHistoricResponse = (order & {
  shopping_list: shopping_list & {
    products_in_shopping_list: (products_in_shopping_list & {
      product: product;
    })[];
  };
})[];

class PurchaseRepository {
  async getHistoric(id: number): Promise<IHistoricResponse | false> {
    try {
      const res = await db.order.findMany({
        where: {
          payment: {
            status: true,
          },
          delivered_status_for_client: true,
          costumer_addresses: {
            costumerId: id,
          },
        },
        include: {
          shopping_list: {
            include: {
              products_in_shopping_list: {
                include: {
                  product: {
                    include: {
                      _count: true,
                      image_of_product: {
                        include: {
                          image: true,
                        },
                      },
                      category_of_product: true,
                      type_of_price_product: true,
                      sale_off: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default new PurchaseRepository();
