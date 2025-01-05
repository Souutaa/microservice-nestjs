import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaModule, KafkaConsumer } from 'kafka'; // Import Kafka từ shared

import { KAFKA_CONSTANTS, OrderDTO } from 'shared'; // Import ActionTypes từ shared
import { OrderService } from './order.service';

@Injectable()
export class OrderListener implements OnModuleInit {
  private kafkaConsumer: KafkaConsumer;
  private actionType = KAFKA_CONSTANTS.OrderActionTypes;

  constructor(private readonly orderService: OrderService) {
    this.kafkaConsumer = KafkaModule.createConsumer(
      KAFKA_CONSTANTS.Topic.TOPIC_ORDER, // Kafka topic
      'command-service-group', // Kafka group
      ['localhost:29092'], // Kafka broker
    );
  }

  async onModuleInit() {
    await this.kafkaConsumer.connect();

    // Lắng nghe thông điệp từ Kafka
    await this.kafkaConsumer.onMessage(async (message) => {
      console.log('Received message:', message);

      switch (message.type) {
        case this.actionType.CREATE_ORDER:
          await this.orderService.createOrder(message.payload as OrderDTO);
          break;

        case this.actionType.UPDATE_ORDER:
          await this.orderService.updateOrder(message.payload as OrderDTO);
          break;

        default:
          console.warn('Unknown action type:', message.type);
      }
    });
  }
}
