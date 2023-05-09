import { orderByDistance } from 'geolib';
import db from '../libs/prisma';
import { getDayOfWeek, getDateFromCurrentHour  } from '../utils';

class ProductService {
  public async index() {
    return db.product.findMany();
  }

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

  async inSaleOff() {
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
    gte: number
  ) {
    const data = getDateFromCurrentHour()
    const now = new Date()
    const dayOfWeek = getDayOfWeek(now.getDay() + 1);
    try {
      const products = await db.product.findMany({
        where: {
          marketer: {
            fair_marketers: {
              some: {
                fair: {
                  fair_date_hour_of_work: {
                    some: {
                      dates: {
                        day_of_week: {
                          name: dayOfWeek,
                        },
                        close_datetime: {
                          gte: data,
                        },
                        open_datetime: {
                          lte: data,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          review: {
            gte: score,
          },
          category_of_productId: category,
          price: {
            gte: lte,
            lte: gte,
          },
          active_for_selling: true,
        },
        include: {
          sale_off: true,
          type_of_price: true,
          image_of_product: {
            include: {
              image: true,
            },
          },
          marketer: true,
        },
        orderBy: {
          marketer: {
            id: 'asc',
          },
        },
      });

      return products;
    } catch (err) {
      console.log(err);
      return false;
    }
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
        marketer: true,
        image_of_product: {
          include: {
            image: true,
          },
        },
        type_of_price: true,
        category_of_product: true,
      },
    });

    const count_in_orders = await db.order.count({
      where: {
        shopping_list: {
          products_in_shopping_list: {
            some: {
              productId: id,
            },
          },
        },
      },
    });

    // @ts-ignore
    product.order_count = count_in_orders;

    return product;
  }

  async findNearest(id: number) {
    const data = getDateFromCurrentHour()
    const now = new Date()
    const dayOfWeek = getDayOfWeek(now.getDay() + 1);

    const products = await db.product.findMany({
      where: {
        marketer: {
          fair_marketers: {
            some: {
              fair: {
                fair_date_hour_of_work: {
                  some: {
                    dates: {
                      day_of_week: {
                        name: dayOfWeek,
                      },
                      close_datetime: {
                        gte: data,
                      },
                      open_datetime: {
                        lte: data,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        active_for_selling: true,
      },
      include: {
        image_of_product: {
          include: {
            image: true,
          },
        },
        marketer: {
          include: {
            location: {
              select: {
                longitude: true,
                latitude: true,
              },
            },
          },
        },
      },
    });

    let userLocation = await db.address.findMany({
      where: {
        costumer_addresses: {
          some: {
            costumerId: id,
          },
        },
      },
      include: {
        location: true,
      },
    });

    const productsWithLocations = products.map((product) => {
      // @ts-ignore
      product.latitude = product.marketer.location.latitude;
      // @ts-ignore
      product.longitude = product.marketer.location.longitude;

      return product;
    });

    userLocation = userLocation.map((address) => {
      // @ts-ignore
      address.latitude = address.location.latitude;
      // @ts-ignore
      address.longitude = address.location.longitude;

      return address;
    });

    // @ts-ignore
    const orderedList = orderByDistance(userLocation[0], productsWithLocations);

    return orderedList;
  }
}

export default new ProductService();
