import { FastifyRequest, FastifyReply } from 'fastify';
import { log } from 'console';
import { IDeliverymanReview, IPurchaseReview } from '../domain/dto/Reviews';
import ReviewService from '../services/review.service';

class ReviewController {
  async reviewPurchase(
    req: FastifyRequest<{
      Body: IPurchaseReview;
    }>,
    rep: FastifyReply
  ) {
    const res = await ReviewService.reviewPurchase(req.body);

    if (!res) {
      return rep.status(500).send({
        error: true,
        message: 'Error in database to implement reviews in products',
      });
    }

    return rep.status(201).send();
  }

  async reviewDeliveryman(
    req: FastifyRequest<{
      Body: IDeliverymanReview;
    }>,
    rep: FastifyReply
  ) {
    const res = await ReviewService.reviewDeliveryman(req.body);

    if (!res) {
      return rep.status(500).send({
        error: true,
        message: 'Error in database to implement review for the deliveryman',
      });
    }

    return rep.status(201).send();
  }
}

export default new ReviewController();
