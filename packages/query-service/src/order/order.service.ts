import { Injectable, NotFoundException } from '@nestjs/common';
import { ElasticsearchClient } from 'shared'; // Import Elasticsearch Client từ shared

@Injectable()
export class OrderService {
  private elasticsearchClient: ElasticsearchClient;

  constructor() {
    this.elasticsearchClient = new ElasticsearchClient(); // Khởi tạo Elasticsearch Client
  }

  /**
   * Lấy thông tin đơn hàng theo ID
   */
  async getOrderById(id: string) {
    const order = await this.elasticsearchClient.get('orders', id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  /**
   * Tìm kiếm đơn hàng
   */
  async searchOrders() {
    const query = {
      match_all: {},
    };

    const orders = await this.elasticsearchClient.search('orders', query);
    return orders;
  }
}
