import {
  deliveryman,
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

type IGetResponse =
  | (order & {
      deliveryman: deliveryman | null;
      shopping_list: shopping_list & {
        products_in_shopping_list: (products_in_shopping_list & {})[];
      };
    })
  | null;

class PurchaseRepository {
  async getHistoric(id: number): Promise<IHistoricResponse | false> {
    try {
      const res = await db.order.findMany({
        where: {
          AND: [
            {
              payment: {
                status: true,
              },
            },
            {
              costumer_addresses: {
                costumerId: id,
              },
            },
          ],
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
                      type_of_price: true,
                      sale_off: true,
                      marketer: {
                        include: {
                          fair_marketers: {
                            include: {
                              fair: {
                                select: {
                                  name: true,
                                  image: true,
                                },
                              },
                            },
                          },
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
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async get(id: number): Promise<IGetResponse> {
    const res = db.order.findUnique({
      where: { id },
      include: {
        deliveryman: true,
        shopping_list: {
          include: {
            products_in_shopping_list: {
              include: {
                product: {
                  include: {
                    marketer: true,
                    image_of_product: {
                      include: {
                        image: true,
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
  }
}

export default new PurchaseRepository();
