import IPurchaseReview from '../domaim/dto/ReviewPurchases';
import db from '../libs/prisma';

class ReviewService {
  async reviewPurchase(args: IPurchaseReview) {
    const { reviews } = args;
    let status = true;
    await Promise.all(
      reviews.map(async ({ avaliation, productId }) => {
        try {
          const previews = await db.product.findUnique({
            where: { id: productId },
            select: {
              avaliations: true,
            },
          });

          await db.product.update({
            where: { id: productId },
            data: {
              avaliations: {
                increment: 1,
              },
              review: { increment: avaliation, divide: previews?.avaliations },
            },
          });
          return true;
        } catch (error) {
          console.log(error);
          status = false;
          return null;
        }
      })
    );

    return status;
  }
}

export default new ReviewService();
