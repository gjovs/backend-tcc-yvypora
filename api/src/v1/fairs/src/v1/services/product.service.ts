import { Prisma } from '@prisma/client';
import db from '../libs/prisma';

interface IProduct {
  description: string;
  name: string;
  price: number;
  price_type: {
    id: number;
    name: string;
  };
  category: {
    name: string;
    id: number;
  };
  quantity?: number;
  available_quantity: number;
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
          quantity: data.quantity,
          description: data.description,
          price: data.price,
          name: data.name,
          available_quantity: data.available_quantity,
          type_of_price: {
            connect: {
              id: data.price_type.id,
            },
          },
        },
      });

      return { error: false, data: res };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return {
          error: true,
          message: 'Failed to save new product in database',
          code: 400,
        };
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
      return { error: false, message: 'Success disabled', code: 200 };
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: true,
          message: 'Failed to disable this product, id is wrong!',
          code: 401,
        };
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
          type_of_price: {
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

      return { data: product, error: false };
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: true,
          message:
            'Failed to update this product, check if this id is correctly assigment',
          code: 404,
        };
      }
    }
  }

  async delete(id: number): Promise<void> {
    await db.product.delete({ where: { id } });
  }

  async index(marketerId: number) {
    const res = await db.product.findMany({
      where: {
        marketerId,
      },
      include: {
        type_of_price: true,
        category_of_product: true,
        image_of_product: {
          include: {
            image: true,
          },
        },
        sale_off: true,
      },
    });

    return res;
  }

  async get(id: number, ownerId: number) {
    try {
      const res = await db.product.findUnique({
        where: {
          id,
        },
        include: {
          type_of_price: true,
          category_of_product: true,
          image_of_product: {
            include: {
              image: true,
            },
          },
          sale_off: true,
        },
      });

      if (!res) {
        return {
          error: true,
          message: 'Failed to get this product, check if this id is correct',
          code: 404,
        };
      }

      if (res.marketerId !== ownerId) {
        return {
          error: true,
          message:
            'Unauthorized operation, this product does not match if the marketer token provided',
          code: 401,
        };
      }

      return { error: false, data: res, code: 200 };
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: true,
          message: 'Failed to get this product, check if this ID is correct',
          code: 404,
        };
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
      return {
        error: false,
        message: 'Successfully appended image to product',
      };
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
      return { error: false, message: 'Success enabled', code: 200 };
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: true,
          message: 'Failed to disable this product, id is wrong!',
          code: 401,
        };
      }
    }
  }

  async checkOwner(ownerId: number, productId: number) {
    try {
      const res = await db.product.findMany({
        where: {
          id: productId,
          marketerId: ownerId,
        },
      });

      console.log('teste', res);

      if (res.length === 0) return false;

      return true;
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: true,
          code: 401,
          message:
            'this operarion is not valid because the owner token is not the same of the product owner',
        };
      }
    }
  }

  async addSaleOff(ownerId: number, productId: number, value: number) {
    try {
      const product = await db.product.findMany({
        where: {
          id: productId,
          marketerId: ownerId,
        },
      });

      const { id } = product[0];

      await db.sale_off.create({
        data: {
          productId: id,
          value,
        },
      });

      await db.product.update({
        where: {
          id: productId,
        },
        data: {
          discount: value,
        },
      });

      return {
        error: false,
        code: 200,
        message: 'Successfully sale off appended in the product!',
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);

        return {
          error: true,
          code: 401,
          message: 'Bad id or bad value parsed to sale off appended',
        };
      }
    }

    return {
      error: true,
      code: 401,
      message: 'Bad id or bad value parsed to sale off appended',
    };
  }

  async removeSaleOff(ownerId: number, productId: number) {
    try {
      const product = await db.product.findMany({
        where: {
          id: productId,
          marketerId: ownerId,
        },
        include: {
          sale_off: true,
        },
      });
      const { id } = product[0];

      await db.sale_off.deleteMany({
        where: {
          productId: id,
        },
      });

      await db.product.update({
        where: {
          id: productId,
        },
        data: {
          discount: null,
        },
      });

      return {
        error: false,
        code: 200,
        message: 'Successfully sale off removed in the product!',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: true,
          code: 401,
          message: 'Bad id or bad value parsed to sale off appended',
        };
      }
    }
    return {
      error: true,
      code: 401,
      message: 'Bad id or bad value parsed to sale off appended',
    };
  }

  async updateAvailableQuantity(data: { quantity: number; id: number }) {
    return db.product.update({
      where: { id: data.id },
      data: { available_quantity: data.quantity },
    });
  }
}

export default new Product();
