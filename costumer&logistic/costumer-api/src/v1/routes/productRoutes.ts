import {FastifyInstance, FastifyRequest} from 'fastify';
import Product from '../services/product.service';
import {ProductController} from '../controllers';
import ProductService from "../services/product.service";

export default async function productRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        querystring: {
          type: 'object',
          required: ['category', 'score', 'lowerPrice', 'higherPrice'],
          properties: {
            category: {type: 'number'},
            score: {type: 'number'},
            lowerPrice: {type: 'number'},
            higherPrice: {type: 'number'},
            moreSales: {type: 'number'},
          },
        },
      },
    },
    ProductController.index,
  );

  server.get('/:id', ProductController.get);
}
