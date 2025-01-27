import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { KAFKA_CONSTANTS } from 'shared';
import { sendMessageType } from './dtos';

export class KafkaConsumer {
  private consumer: Consumer;

  constructor(
    private readonly topic: KAFKA_CONSTANTS.Topic,
    private readonly groupId: string,
    private readonly brokers: string[],
  ) {
    const kafka = new Kafka({
      clientId: 'kafka-consumer',
      brokers: this.brokers,
    });

    this.consumer = kafka.consumer({
      groupId,
      retry: {
        retries: 5, // Số lần thử lại nếu gặp lỗi
      },
    });
  }

  async connect() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: false });
    console.log(
      `Kafka Consumer connected to topic "${this.topic}" in group "${this.groupId}"`,
    );
  }

  async onMessage<T>(callback: (message: sendMessageType<T>) => void) {
    await this.consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        const parsedMessage = JSON.parse(message.value?.toString() || '{}');
        console.log(`----MESSAGE RECEIVED ON TOPIC "${this.topic}"----`);
        console.log(parsedMessage);
        console.log('-------------------------------------------------');
        callback(parsedMessage);
      },
    });
  }

  async disconnect() {
    await this.consumer.disconnect();
    console.log(`Kafka Consumer for topic "${this.topic}" disconnected.`);
  }
}
