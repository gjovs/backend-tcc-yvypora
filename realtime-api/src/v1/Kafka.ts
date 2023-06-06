import { Consumer, Kafka, logLevel } from "kafkajs";
import { OrderController } from "./controllers/index";
import { Worker } from "worker_threads";
import { promisify } from "util";

class KafkaConsumer {
  private kafka: Kafka;
  public consumer: Consumer | undefined;

  constructor(args: { clientId: string; brokers: string[] }) {
    this.kafka = new Kafka({ ...args, logLevel: logLevel.ERROR });
    this.initConsumer();
  }

  private initConsumer() {
    this.consumer = this.kafka.consumer({ groupId: "logistic-group" });
  }

  public async start() {
    await this.consumer?.connect();
    await this.consumer?.subscribe({ topic: "payment_intent" });
  }

  public async runConsumer() {
    await this.consumer?.run({
      eachMessage: async ({ topic, partition, message }) => {
        // @ts-ignore
        const payload = JSON.parse(message.value);

        console.log(payload);

        const res = await OrderController.toQueue({ intent_payment_id: payload.intent_payment_id});

        console.log(res);
      },
    });
  }
}

export default new KafkaConsumer({
  clientId: "logistic",
  brokers: ["localhost:9092"],
});
