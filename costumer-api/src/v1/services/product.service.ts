import db from "../libs/prisma";
import { getDayOfWeek } from "../utils";
import { orderByDistance } from "geolib";

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
    let data;
    const now = new Date();

    if (now.getHours().toString().length == 1)
      data = new Date(`1900-01-01T0${now.getHours()}:00:00.000Z`);
    else data = new Date(`1900-01-01T${now.getHours()}:00:00.000Z`);

    const dayOfWeek = getDayOfWeek(now.getDay());

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
                        lte: data,
                      },
                      open_datetime: {
                        gte: data,
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
      by: ["productId"],
      orderBy: {
        productId: "asc",
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

    return product;
  }

  async findNearest(id: number) {
    let data;
    const now = new Date();

    if (now.getHours().toString().length == 1)
      data = new Date(`1900-01-01T0${now.getHours()}:00:00.000Z`);
    else data = new Date(`1900-01-01T${now.getHours()}:00:00.000Z`);

    const dayOfWeek = getDayOfWeek(now.getDay());

    let productsWithLocations = await db.product.findMany({
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
                        lte: data,
                      },
                      open_datetime: {
                        gte: data,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      include: {
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

    productsWithLocations = productsWithLocations.map((product) => {
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
