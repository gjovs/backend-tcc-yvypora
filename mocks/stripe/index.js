const stripe = require("stripe")(process.env.STRIPE_KEY); // Replace with your own test key

// Mock a successful Payment Intent creation
const mockPaymentIntent = {
  id: "pi_1234567890", // Replace with your own ID
  amount: 1000,
  currency: "usd",
  status: "succeeded",
  payment_method_types: ["card"],
};

stripe.paymentIntents.create(
  {
    amount: 1000,
    currency: "usd",
    payment_method_types: ["card"],
    description: "Test Payment Intent",
  },
  function (err, paymentIntent) {
    if (err) {
      console.log(err);
    } else {
      console.log(paymentIntent);
    }
  }
);

// Intercept HTTP requests made by the Stripe library and return the mock Payment Intent
const nock = require("nock");

nock("https://api.stripe.com")
  .post("/v1/payment_intents")
  .reply(200, mockPaymentIntent);
