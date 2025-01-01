import { Injectable } from '@nestjs/common';
import { KafkaModule, KafkaProducer } from 'kafka';
import { KAFKA_CONSTANTS, OrderDTO } from 'shared';
@Injectable()
export class OrderService {
  private kafkaProducer: KafkaProducer;

  constructor() {
    this.kafkaProducer = KafkaModule.createProducer(
      KAFKA_CONSTANTS.Topic.TOPIC_ORDER,
      ['localhost:9092'],
    );
  }

  async createOrder(order: OrderDTO) {
    // Kết nối Kafka Producer
    await this.kafkaProducer.connect();

    // Gửi thông tin đơn hàng tới Kafka
    await this.kafkaProducer.sendMessage(order);

    // Ngắt kết nối Kafka Producer
    await this.kafkaProducer.disconnect();

    return { message: 'Order created successfully!', order };
  }
}
