export class OrderDTO {
  id!: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  quantity: number;
  price: number;
  status: string;
  created_at: Date;

  constructor(partial: Partial<OrderDTO>) {
    // Object.assign(this, partial);

    // Tự động gán UUID nếu `id` chưa được truyền
    this.buyer_id = partial.buyer_id || '';
    this.seller_id = partial.seller_id || '';
    this.product_id = partial.product_id || '';
    this.quantity = partial.quantity || 0;
    this.price = partial.price || 0;
    this.status = partial.status || 'pending'; // Có thể gán giá trị mặc định 'pending' cho `status`
    this.created_at = partial.created_at || new Date();
  }
}
