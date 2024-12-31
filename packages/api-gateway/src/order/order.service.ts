import { Injectable } from '@nestjs/common';
import { KafkaProducer } from 'shared';

@Injectable()
export class OrderService {
  private kafkaProducer: KafkaProducer;

  constructor() {
    this.kafkaProducer = new KafkaProducer('order-topic');
  }

  async createOrder(order: any) {
    await this.kafkaProducer.sendMessage(order);
    return { message: 'Order created successfully!' };
  }
}
