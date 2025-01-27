import { Injectable } from '@nestjs/common';
import { KafkaProducer, KafkaModule } from 'kafka';
import { CassandraClient, KAFKA_CONSTANTS, RestResponse } from 'shared'; // Import Cassandra từ shared
import { OrderDTO } from 'shared'; // DTO cho đơn hàng
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class OrderService {
  private cassandraClient: CassandraClient;
  private kafkaProducer: KafkaProducer;
  private topic = KAFKA_CONSTANTS.Topic;
  private actionOrder = KAFKA_CONSTANTS.OrderActionTypes;

  constructor() {
    this.cassandraClient = new CassandraClient(); // Khởi tạo Cassandra Client
    this.kafkaProducer = KafkaModule.createProducer(this.topic.TOPIC_ORDER, [
      'localhost:29092',
    ]);
  }

  /**
   * Tạo đơn hàng mới
   */
  async createOrder(order: OrderDTO): Promise<RestResponse<OrderDTO>> {
    try {
      if (!order.id) {
        order.id = uuidv4();
      }
      await this.cassandraClient.insert('orders', order);
    } catch (error) {
      throw new Error(`Thực hiện lưu data không thành công: ${error}`);
    }

    try {
      await this.kafkaProducer.connect();
      await this.kafkaProducer.sendMessage({
        type: this.actionOrder.CREATE_ORDER,
        payload: order,
      });

      console.log('=====> Order created and event sent to Kafka <=====');
      await this.kafkaProducer.disconnect();
      return { message: 'Order created successfully!', data: order };
    } catch (error) {
      await this.kafkaProducer.disconnect(); // Đảm bảo Kafka được ngắt kết nối trong trường hợp lỗi
      throw new Error(`Failed to create order: ${error.message}`);
    }
    // Gửi sự kiện tới Kafka
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

  async getOrdersList() {
    const orders = await this.cassandraClient.select('orders');

    // Gửi sự kiện tới Kafka
    // await this.kafkaProducer.connect();
    // await this.kafkaProducer.sendMessage({
    //   type: this.actionOrder.FETCH_ORDER,
    //   payload: orders,
    // });
    // await this.kafkaProducer.disconnect();

    console.log('Order created and event sent to Kafka:', orders);
    return orders;
  }
}
