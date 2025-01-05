import { Injectable } from '@nestjs/common';
import { KafkaProducer, KafkaModule } from 'kafka';
import { CassandraClient, KAFKA_CONSTANTS } from 'shared'; // Import Cassandra từ shared
import { OrderDTO } from 'shared'; // DTO cho đơn hàng

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
  async createOrder(order: OrderDTO) {
    await this.cassandraClient.insert('orders', order);

    // Gửi sự kiện tới Kafka
    await this.kafkaProducer.connect();
    await this.kafkaProducer.sendMessage({
      type: this.actionOrder.CREATE_ORDER,
      payload: order,
    });
    await this.kafkaProducer.disconnect();

    console.log('Order created and event sent to Kafka:', order);
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
