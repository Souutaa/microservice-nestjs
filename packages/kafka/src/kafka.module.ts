import { KafkaProducer } from './kafka.producer';
import { KafkaConsumer } from './kafka.consumer';
import { KAFKA_CONSTANTS } from 'shared';

export class KafkaModule {
  static createProducer(
    topic: KAFKA_CONSTANTS.Topic,
    brokers: string[],
  ): KafkaProducer {
    return new KafkaProducer(topic, brokers);
  }

  static createConsumer(
    topic: KAFKA_CONSTANTS.Topic,
    groupId: string,
    brokers: string[],
  ): KafkaConsumer {
    return new KafkaConsumer(topic, groupId, brokers);
  }
}
