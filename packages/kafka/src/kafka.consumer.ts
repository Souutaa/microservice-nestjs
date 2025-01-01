import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { ActionTypes } from 'shared';

export class KafkaConsumer {
  private consumer: Consumer;

  constructor(
    private readonly topic: ActionTypes,
    private readonly groupId: string,
    private readonly brokers: string[],
  ) {
    const kafka = new Kafka({
      clientId: 'kafka-consumer',
      brokers: this.brokers,
    });

    this.consumer = kafka.consumer({ groupId });
  }

  async connect() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: false });
    console.log(
      `Kafka Consumer connected to topic "${this.topic}" in group "${this.groupId}"`,
    );
  }

  async onMessage(callback: (message: any) => void) {
    await this.consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        const parsedMessage = JSON.parse(message.value?.toString() || '{}');
        console.log(
          `Message received on topic "${this.topic}":`,
          parsedMessage,
        );
        callback(parsedMessage);
      },
    });
  }

  async disconnect() {
    await this.consumer.disconnect();
    console.log(`Kafka Consumer for topic "${this.topic}" disconnected.`);
  }
}
