import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchClient, KAFKA_CONSTANTS, OrderDTO } from 'shared'; // Import Elasticsearch Client từ shared
import { KafkaConsumer } from 'kafka';

@Injectable()
export class OrderSyncService implements OnModuleInit {
  private actionType = KAFKA_CONSTANTS.OrderActionTypes;
  private brokers = process.env.KAFKA_BROKER || '0.0.0.0:29092';
  private kafkaConsumer = new KafkaConsumer(
    KAFKA_CONSTANTS.Topic.TOPIC_ORDER,
    'query-service-group',
    [this.brokers],
  ); // Khởi tạo Kafka Consumer
  private elasticsearchClient = new ElasticsearchClient();

  async onModuleInit() {
    await this.kafkaConsumer.connect();

    // Lắng nghe thông điệp từ Kafka
    await this.kafkaConsumer.onMessage<OrderDTO>(async (message) => {
      console.log('ELASTICSEARCH RECEIVED MESSAGE TO SYNCED');
      console.log('Received message from Kafka:', message);

      const { type, payload } = message;

      switch (type) {
        case this.actionType.CREATE_ORDER:
        case this.actionType.UPDATE_ORDER:
          // Đồng bộ dữ liệu tới Elasticsearch
          await this.elasticsearchClient.index('orders', payload.id, payload);
          console.log('Order synced to Elasticsearch:', payload);
          break;

        default:
          console.warn('Unknown event type:', type);
      }
    });
  }
}
