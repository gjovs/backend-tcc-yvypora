import db from '../libs/prisma';

class ProductService {
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

  async filteredByPriceAndScoreAndCategory(
    category: number,
    score: number,
    lte: number,
    gte: number,
  ) {
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
  async moreSales(listSize: number) {
    const sales = await db.products_in_shopping_list.groupBy({
      by: ['productId'],
      orderBy: {
        productId: 'asc',
      },
      _count: { productId: true },
      take: listSize,
    });

    return sales;
  }

  async get(id: number) {
    const product = await db.product.findUnique({
      where: { id },
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
}

export default new ProductService();
