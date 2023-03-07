import db from '../libs/prisma';

interface IProduct {
  name: string
  price: number,
  price_type: {
    id: number,
    name: string
  }
  category: {
    name: string,
    id: number
  },
  available_quantity: number
}

class Product {
  async create(data: IProduct, ownerId: number) {
    try {
      const res = await db.product.create({
        data: {
          marketer: {
            connect: {
              id: ownerId,
            },
          },
          category_of_product: {
            connect: {
              id: data.category.id,
            },
          },
          price: data.price,
          name: data.name,
          available_quantity: data.available_quantity,
          type_of_price_product: {
            connect: {
              id: data.price_type.id,
            },
          },
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
      return { error: false, message: "Success disabled", code: 200}
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, message: 'Failed to disable this product, id is wrong!', code: 401 };
      }
    }
  }

  async update(data: IProduct, id: number) {
    try {
      const product = await db.product.update({
        where: {
          id,
        },
        data: {
          available_quantity: data.available_quantity,
          price: data.price,
          type_of_price_product: {
            connect: {
              id: data.price_type.id,
            },
          },
          name: data.name,
          category_of_product: {
            connect: {
              id: data.category.id,
            },
          },
        },
      });

      return {data: product, error: false};
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: true,
          message: 'Failed to update this product, check if this id is correctly assigment',
          code: 404,
        };
      }
    }
  }

  async index(marketerId: number) {
    const res = await db.product.findMany({
      where: {
        marketerId,
      },
    });

    return res;
  }

  async get(id: number) {
    try {
      const res = await db.product.findUnique({
        where: {
          id,
        },
      });

      return res;
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, message: 'Failed to get this product, check if this ID is correct', code: 404 };
      }
    }
  }

  async appendPicture(id: number, uri: string) {
    try {
      await db.product.update({
        where: {
          id,
        },
        data: {
          image_of_product: {
            create: {
              image: {
                create: {
                  uri,
                },
              },
            },
          },
        },
      });
      return { error: false, message: 'Successfully appended image to product' };
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, code: 401, message: error.message };
      }
    }
  }

  async removePicture(id: number) {
    try {
      await db.image.delete({
        where: { id },
      });

      return { error: false, message: 'Successfully removed image to product' };
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, code: 401, message: error.message };
      }
    }
  }

  async enable(id: number) {
    try {
      await db.product.update({
        where: { id },
        data: {
          active_for_selling: true,
        },
      });
      return { error: false, message: "Success disabled", code: 200}
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, message: 'Failed to disable this product, id is wrong!', code: 401 };
      }
    }
  }
}

export default new Product();
