import { Injectable } from '@nestjs/common';
import { CassandraClient } from 'shared'; // Import Cassandra từ shared
import { OrderDTO } from 'shared'; // DTO cho đơn hàng

@Injectable()
export class OrderService {
  private cassandraClient: CassandraClient;

  constructor() {
    this.cassandraClient = new CassandraClient(); // Khởi tạo Cassandra Client
  }

  /**
   * Tạo đơn hàng mới
   */
  async createOrder(order: OrderDTO) {
    await this.cassandraClient.insert('orders', order);
    console.log('Order created and saved to Cassandra:', order);
  }

  /**
   * Cập nhật đơn hàng
   */
  async updateOrder(order: OrderDTO) {
    const existingOrder = await this.cassandraClient.select(
      'orders',
      'id = ?',
      [order.id],
    );

    if (!existingOrder.length) {
      console.error('Order not found:', order.id);
      return;
    }

    await this.cassandraClient.insert('orders', order); // Upsert dữ liệu
    console.log('Order updated in Cassandra:', order);
  }
}
