import { log } from 'console';
import { IDeliverymanReview, IPurchaseReview } from '../domain/dto/Reviews';
import db from '../libs/prisma';

class ReviewService {
  async reviewPurchase(args: IPurchaseReview) {
    const { reviews } = args;

    let status = true;

    await Promise.all(
      reviews.map(async ({ avaliation, productId }) => {
        try {
          const { review: lastReviews } = await db.product.findUniqueOrThrow({
            where: { id: productId },
            select: {
              avaliations: true,
              review: true,
            },
          });

          console.log(lastReviews);
          

          await db.product.update({
            where: { id: productId },
            data: {
              avaliations: {
                increment: 1,
              },
              review: avaliation + lastReviews,
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

  async reviewDeliveryman(args: IDeliverymanReview) {
    try {
      const { review } = args;

      const { avaliations: lastAvaliations, review: lastReviews } =
        await db.deliveryman.findUniqueOrThrow({
          where: { id: review.deliverymanId },
          select: { avaliations: true, review: true },
        });

      const newReviewValue = review.avaliation + lastReviews;
      console.log(newReviewValue,lastReviews, review.avaliation);
      

      await db.deliveryman.update({
        where: { id: review.deliverymanId },
        data: {
          avaliations: { increment: 1 },
          review: newReviewValue,
        },
      });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return false;
      }
    }

    return false;
  }
}

export default new ReviewService();
