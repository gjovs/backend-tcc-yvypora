import { db } from '../libs';

class ReportsService {
  async dailySellsReport(sellerId: number) {
    try {
      const report = await db.shopping_list.groupBy({
        by: ['total'],
        orderBy: {
          total: 'asc',
        },
        where: {
          order: {
            payment: {
              status: true,
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

async function teste() {
  const instance = new ReportsService();
  const data = await instance.dailySellsReport(1);
  console.log(data);
}

teste().then().catch();
