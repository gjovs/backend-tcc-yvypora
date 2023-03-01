import db from '../libs/prisma';

class Product {
  async create(data: {
    ownerId: number,
    name: string
    price: number,
    price_type: boolean,
    category: {
      name: string,
      id: number
    },
    available_quantity: number
  }) {
    try {
      const res = await db.product.create({
        data: {
          marketerId: data.ownerId,
          category_of_productId: data.category.id,
          price: data.price,
          price_type: data.price_type,
          name: data.name,
          available_quantity: data.available_quantity,
        },
      });

      return { error: false, data: res };
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, message: 'Failed to save new product in database', code: 401 };
      }
    }
  }

  async disable(id: number) {
    try {
      await db.product.update({
        where: { id },
        data: {
          active_for_selling: false,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, message: 'Failed to disable this product, id is wrong!', code: 401 };
      }
    }
  }
}

export default new Product();
