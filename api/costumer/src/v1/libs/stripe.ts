import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY as string, { apiVersion: '2022-11-15' });

const createSession = async (data_product: Awaited<{ amount: number; name: any; id: number; value: number } | Error>[]) => {
  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.BASE_URL}/purchases/success`,
    cancel_url: `${process.env.BASE_URL}/purchases/cancel`,
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: data_product.map((item) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.name,
        },
        // @ts-ignore
        unit_amount: item.value,
      },
      // @ts-ignore
      quantity: item.amount,
    })),
  });
  return session;
};

export { createSession };
