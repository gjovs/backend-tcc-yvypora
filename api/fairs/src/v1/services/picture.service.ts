import db from '../libs/prisma';

export class Picture {
  async delete(id: number) {
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
}

export default new Picture();
