import { FastifyRequest, FastifyReply } from 'fastify';
import IPurchaseReview from '../domain/dto/ReviewPurchases';
import ReviewService from '../services/review.service';

class ReviewController {
  async reviewPurchase(
    req: FastifyRequest<{
      Body: {
        reviews: IPurchaseReview;
      };
    }>,
    rep: FastifyReply
  ) {
    const { reviews } = req.body;

    const res = await ReviewService.reviewPurchase(reviews);

    if (!res) {
      return rep.status(500).send({
        error: true,
        message: 'Error in database to implement reviews in products',
      });
    }

    return rep.status(201);
  }
}

export default new ReviewController();
