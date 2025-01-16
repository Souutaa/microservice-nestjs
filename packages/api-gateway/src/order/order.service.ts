import { Injectable } from '@nestjs/common';
import { KafkaModule, KafkaProducer } from 'kafka';
import { KAFKA_CONSTANTS, OrderDTO, RestResponse } from 'shared';
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

  async createOrder(order: OrderDTO): Promise<RestResponse<OrderDTO>> {
    try {
      await this.kafkaProducer.connect();

      await this.kafkaProducer.sendMessage({
        type: this.actionOrder.CREATE_ORDER,
        payload: order,
      });

      await this.kafkaProducer.disconnect();

      // Trả về kết quả
      return { message: 'Order created successfully!', data: order };
    } catch (error) {
      // Xử lý lỗi
      await this.kafkaProducer.disconnect(); // Đảm bảo Kafka được ngắt kết nối trong trường hợp lỗi
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async getOrdersList(): Promise<any> {
    try {
      await this.kafkaProducer.connect();

      await this.kafkaProducer.sendMessage({
        type: this.actionOrder.FETCH_ORDER,
        payload: {},
      });

      await this.kafkaProducer.disconnect();
      // Trả về kết quả
      return { message: 'Order created successfully!', data: {} };
    } catch (error) {
      // Xử lý lỗi
      await this.kafkaProducer.disconnect(); // Đảm bảo Kafka được ngắt kết nối trong trường hợp lỗi
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }
}
