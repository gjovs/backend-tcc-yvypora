import db from '../libs/prisma';

class Product {
  async create(data: {
    price: number,
    category: {
      name: string,
      id: number
    },
  }) {
    const res = await db.product.create({
      data: {

      },
    });
  }
}

export default new Product();
