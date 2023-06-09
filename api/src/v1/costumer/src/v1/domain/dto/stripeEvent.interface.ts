export interface IStripePurchaseEvent {
  id: string;
  object: string;
  api_version: string;
  created: number;
  type: string;
  data: {
    object: {
      id: string;
      object: string;
      amount: number;
      amount_capturable: number;
      amount_details: object;
      amout_received: number;
      currency: string;
      description: string;
      status: string;
    };
  };
}