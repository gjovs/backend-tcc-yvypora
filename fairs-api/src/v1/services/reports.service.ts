import { db } from "../libs";

class ReportsService {
  private lastWeek = () => new Date((Date.now() - 24 * 60 * 60 * 1000) * 7).toISOString();

  private lastMonth = () => new Date((Date.now() - 24 * 60 * 60 * 1000) * 28).toISOString();

  async dailySellsReport(sellerId: number) {
    try {
      const report = await db.shopping_list.groupBy({
        by: ["total"],
        orderBy: {
          total: "asc",
        },
        where: {
          order: {
            payment: {
              status: true,
            },
            created_at: {
              gte: new Date(),
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
        _avg: {
          total: true,
        },
        _count: {
          _all: true,
        },
      });
      return report;
    } catch (error) {
      if (error instanceof Error) {
        return { code: 400, message: error.message, error: true };
      }
    }
  }

  async weeklySellsReport(sellerId: number) {
    try {
      const report = await db.shopping_list.groupBy({
        by: ["total"],
        orderBy: {
          total: "asc",
        },
        where: {
          order: {
            payment: {
              status: true,
            },
            created_at: {
              lte: new Date(),
              gte: this.lastWeek(),
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
        _avg: {
          total: true,
        },
        _count: {
          _all: true,
        },
      });
      return report;
    } catch (error) {
      if (error instanceof Error) {
        return { code: 400, message: error.message, error: true };
      }
    }
  }

  async monthlySellsReport(sellerId: number) {
    try {
      const report = await db.shopping_list.groupBy({
        by: ["total"],
        orderBy: {
          total: "asc",
        },
        where: {
          order: {
            payment: {
              status: true,
            },
            created_at: {
              lte: new Date(),
              gte: this.lastMonth(),
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
        _avg: {
          total: true,
        },
        _count: {
          _all: true,
        },
      });
      return report;
    } catch (error) {
      if (error instanceof Error) {
        return { code: 400, message: error.message, error: true };
      }
    }
  }
}

export default new ReportsService();
