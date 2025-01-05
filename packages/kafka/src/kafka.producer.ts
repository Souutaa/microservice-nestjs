import { Kafka, Producer } from 'kafkajs';
import { KAFKA_CONSTANTS } from 'shared';
import { sendMessageType } from './dtos';

export class KafkaProducer {
  private producer: Producer;

  constructor(
    private readonly topic: KAFKA_CONSTANTS.Topic,
    private readonly brokers: string[],
  ) {
    const kafka = new Kafka({
      clientId: 'kafka-producer',
      brokers: this.brokers,
    });

    this.producer = kafka.producer();
  }

  async connect() {
    await this.producer.connect();
    console.log(`Kafka Producer connected to topic "${this.topic}"`);
  }

  async sendMessage<T>(message: sendMessageType<T>) {
    await this.producer.send({
      topic: this.topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Message sent to topic "${this.topic}":`, message);
  }

  async disconnect() {
    await this.producer.disconnect();
    console.log(`Kafka Producer for topic "${this.topic}" disconnected.`);
  }
}
