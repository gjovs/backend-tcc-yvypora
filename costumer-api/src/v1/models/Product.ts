import { renameProperties } from 'firebase-admin/lib/utils';
import { privateDecrypt } from 'crypto';
import db from '../libs/prisma';

class Product {
  // filters
  private async byPrice(lte: number, gte: number, data: any) {
    const products = await data.findMany({
      where: {
        price: {
          gte: lte,
          lte: gte,
        },
      },
      include: {
        sale_off: true,
        image_of_product: {
          include: {
            image: true,
          },
        },
      },
    });

    return products;
  }

  private async inSaleOff() {
    const products = await db.sale_off.findMany({
      include: {
        product: {
          include: {
            sale_off: true,
            image_of_product: {
              include: {
                image: true,
              },
            },
          },
        },
      },
    });

    console.log(products);

    return products;
  }

  private async byCategory(id: number) {
    const products = await db.category_of_product.findUnique({
      where: {
        id,
      },
      include: {
        product: {
          include: {
            sale_off: true,
            image_of_product: {
              include: {
                image: true,
              },
            },
          },
        },
      },
    });

    return products;
  }

  private async byScore(score: number, data: any) {
    const products = await data.findMany({
      where: {
        review: {
          gt: score,
        },
      },
      include: {
        sale_off: true,
        image_of_product: {
          include: {
            image: true,
          },
        },
      },
    });

    return products;
  }

  async filteredByPriceAndScoreAndCategory(category: number, score: number, lte: number, gte: number) {
    const products = await db.product.findMany({
      where: {
        review: {
          gte: score,
        },
        category_of_productId: category,
        price: {
          gte: lte,
          lte: gte,
        },
      },
      include: {
        sale_off: true,
        image_of_product: {
          include: {
            image: true,
          },
        },
      },
    });

    return products;
  }

  // list
  async moreSales() {
    // TODO more sales relation
    const sales = await db.order.findMany({
      where: {
        delivered_status_for_client: true,
      },
      include: {
        shopping_list: {
          include: {
            products_in_shopping_list: {
              include: {
                product: {
                  include: {
                    sale_off: true,
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

    const products_list: unknown[] = [];
    sales.forEach((sale) => {
      const products = sale.shopping_list.products_in_shopping_list.map((item) => item.product);
      products_list.push(...products);
    });
    // TODO GROUP BY TO GET THE MOST SOLD PRODUCTS

    return products_list;
  }
}

export default new Product();

async function teste() {
  const instance = new Product();
  const res = await instance.moreSales();
  console.log(res);
}

teste().then().catch();
