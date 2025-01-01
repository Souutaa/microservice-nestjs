import { KafkaProducer } from './kafka.producer';
import { KafkaConsumer } from './kafka.consumer';
import { ActionTypes } from 'shared';

export class KafkaModule {
  static createProducer(topic: ActionTypes, brokers: string[]): KafkaProducer {
    return new KafkaProducer(topic, brokers);
  }

  static createConsumer(
    topic: ActionTypes,
    groupId: string,
    brokers: string[],
  ): KafkaConsumer {
    return new KafkaConsumer(topic, groupId, brokers);
  }
}
