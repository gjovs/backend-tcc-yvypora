import { log } from 'console';
import { db } from '../libs';

class ReportsService {
  async index(sellerId: number) {
    // THIS QUERY FETCH ALL SOlD ORDERS
    try {
      const res = await db.shopping_list.findMany({
        orderBy: {
          updated_at: 'desc'
        },
        where: {
          order: {
            payment: {
              status: true,
            },
          },
          products_in_shopping_list: {
            some: {
              product: {
                marketerId: sellerId,
              },
            },
          },
        },
        include: {
          products_in_shopping_list: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  type_of_price: {
                    select: { name: true }
                  },

                  marketerId: true,
                  price: true,
                  image_of_product: {
                    include: {
                      image: {
                        select: {
                          uri: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          costumer: {
            select: {
              name: true,
              picture_uri: true,
            },
          },
          _count: true,
        },
      });

      if (res) {
        res.forEach((shopping_list) => {
          let total = 0;
          const { products_in_shopping_list } = shopping_list;
          const filteredProducts = products_in_shopping_list.filter(
            ({ product }) => {
              const { marketerId } = product;
              return marketerId === sellerId;
            }
          );
          filteredProducts.forEach(({ product, amount }) => {
            const { price } = product;
            total += price * (amount ? amount : 1);
          });
          shopping_list.total = total;
          shopping_list.products_in_shopping_list = filteredProducts;
        });
      }

      return res;
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return { error: true, message: error.message };
      }
    }
  }

  async dailySellsReport(sellerId: number) {
    try {
      const currentDate = new Date();
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );

      let report = await db.shopping_list.findMany({
        orderBy: {
          updated_at: 'asc',
        },
        where: {
          order: {
            payment: {
              status: true,
            },
            created_at: {
              gte: startDate,
              lt: endDate,
            },
          },
          products_in_shopping_list: {
            every: {
              product: {
                marketerId: sellerId,
              },
            },
          },
        },
      });

      let total: number = 0;

      report.forEach((data) => {
        total += data.total / 100;
      });

      report.push({
        // @ts-ignore
        _nums: {
          sells: report.length,
        },
        // @ts-ignore
        _sum: {
          total,
        },
      });
      return report;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return { code: 400, message: error.message, error: true };
      }
    }
  }

  async weeklySellsReport(sellerId: number) {
    try {
      const currentDate = new Date();
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + (7 - currentDate.getDay())
      );

      let report = await db.shopping_list.findMany({
        orderBy: {
          updated_at: 'asc',
        },
        where: {
          order: {
            payment: {
              status: true,
            },
            created_at: {
              gte: startDate,
              lt: endDate,
            },
          },
          products_in_shopping_list: {
            every: {
              product: {
                marketerId: sellerId,
              },
            },
          },
        },
      });

      let total: number = 0;

      report.forEach((data) => {
        total += data.total / 100;
      });

      report.push({
        // @ts-ignore
        _nums: {
          sells: report.length,
        },
        // @ts-ignore
        _sum: {
          total,
        },
      });
      return report;
    } catch (error) {
      log(error);
      if (error instanceof Error) {
        return { code: 400, message: error.message, error: true };
      }
    }
  }

  async monthlySellsReport(sellerId: number) {
    try {
      const currentDate = new Date();
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      let report = await db.shopping_list.findMany({
        orderBy: {
          updated_at: 'asc',
        },
        where: {
          order: {
            payment: {
              status: true,
            },
            created_at: {
              gte: startDate,
              lt: endDate,
            },
          },
          products_in_shopping_list: {
            every: {
              product: {
                marketerId: sellerId,
              },
            },
          },
        },
      });

      let total: number = 0;

      report.forEach((data) => {
        console.log(data.total / 100);
        total += data.total / 100;
      });

      report.push({
        // @ts-ignore
        _nums: {
          sells: report.length,
        },
        // @ts-ignore
        _sum: {
          total,
        },
      });
      return report;
    } catch (error) {
      if (error instanceof Error) {
        log(error);
        return { code: 400, message: error.message, error: true };
      }
    }
  }
}

export default new ReportsService();
