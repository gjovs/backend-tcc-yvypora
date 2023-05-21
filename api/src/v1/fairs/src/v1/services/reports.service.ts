import { log } from 'console';
import { db } from '../libs';

class ReportsService {
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
          total: 'asc',
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
          total: 'asc',
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
          total: 'asc',
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
        log(error);
        return { code: 400, message: error.message, error: true };
      }
    }
  }
}

export default new ReportsService();
