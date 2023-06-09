import { IPurchase } from "../domain/dto/purchase.interface";
import orderRepository from "./order.repository";
import productRepository from "./product.repository";


interface IRegisterIntentationOfPurchase extends IPurchase {
  total: number,
  intent_payment_id: string,
  costumer: { id: number, address_id: number }

}

class PurchaseService {
  
  async getDetailsOfProducts(args: IPurchase) {
    const { products } = args
    const productsWithNecessaryData = await Promise.all(
      products.map(async (_product) => {
        const product = await productRepository.get(_product.id);

        if (product) {
          return {
            id: _product.id,
            value: Number((product.price * 100).toFixed(2)),
            amount: _product.amount,
            name: product.name,
          };
        }

        throw new Error('Invalid Product Id');
      })
    );

    return productsWithNecessaryData
  }

  async registerIntentationOfPurchase(args: IRegisterIntentationOfPurchase) {
    try {
      await orderRepository.createIntent(args);
      return true;
    } catch (error) {
      return false
    }
  }
}

export default new PurchaseService();