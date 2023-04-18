import { FastifyInstance } from 'fastify';
import ProductService from '../services/product.service.ts'
export default async function (server: FastifyInstance)  {
    server.get('/products', async () => { return (await ProductService.index())})

}