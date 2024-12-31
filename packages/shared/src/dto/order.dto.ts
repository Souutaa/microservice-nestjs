export class OrderDTO {
  id: string = "";
  buyer_id: string = "";
  seller_id: string = "";
  product_id: string = "";
  quantity: number = 0;
  price: number = 0;
  status: string = "";
  created_at: Date = new Date();

  constructor(partial: Partial<OrderDTO>) {
    Object.assign(this, partial);
  }
}
