import { Kafka } from "kafkajs";

export class KafkaProducer {
  private kafka = new Kafka({ brokers: ["localhost:9092"] });
  private producer = this.kafka.producer();

  constructor(private readonly topic: string) {}

  async sendMessage(message: any) {
    await this.producer.connect();
    await this.producer.send({
      topic: this.topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
