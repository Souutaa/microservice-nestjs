import { Injectable } from '@nestjs/common';
import { KafkaModule, KafkaProducer } from 'kafka';
import { KAFKA_CONSTANTS, OrderDTO } from 'shared';
@Injectable()
export class OrderService {
  private kafkaProducer: KafkaProducer;
  private topic = KAFKA_CONSTANTS.Topic;
  private actionOrder = KAFKA_CONSTANTS.OrderActionTypes;

  constructor() {
    this.kafkaProducer = KafkaModule.createProducer(this.topic.TOPIC_ORDER, [
      'localhost:29092',
    ]);
  }

  async createOrder(order: OrderDTO) {
    // Kết nối Kafka Producer
    await this.kafkaProducer.connect();

    // Gửi thông tin đơn hàng tới Kafka
    await this.kafkaProducer.sendMessage({
      type: this.actionOrder.CREATE_ORDER,
      payload: order,
    });

    // Ngắt kết nối Kafka Producer
    await this.kafkaProducer.disconnect();

    return { message: 'Order created successfully!', order };
  }
}
