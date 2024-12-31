import { Kafka } from "kafkajs";

export class KafkaConsumer {
  private kafka = new Kafka({ brokers: ["localhost:9092"] });
  private consumer = this.kafka.consumer({ groupId: "order-group" });

  constructor(private readonly topic: string) {
    this.consumer.subscribe({ topic });
  }

  async onMessage(callback: (message: any) => void) {
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        callback(JSON.parse(message!.value!.toString()));
      },
    });
  }
}
