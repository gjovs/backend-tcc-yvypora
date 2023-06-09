export interface IPurchase {
  costumer_address_id: number;
  products: { id: number; amount: number }[];
  freight: number;
}