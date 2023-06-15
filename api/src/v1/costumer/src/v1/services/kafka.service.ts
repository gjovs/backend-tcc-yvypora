import { CompressionTypes, Producer } from "kafkajs";
import KafkaProducer from '../../../../Kafka';

interface IMessageToKafka {
    value: string;
}

class KafkaService {
    constructor(private producer: Producer) { }

    async sendMessageToKafka(topic: string, messages: IMessageToKafka[]): Promise<void> {
        await this.producer.send({
            topic,
            compression: CompressionTypes.GZIP,
            messages,
        });
    }

}

export default new KafkaService(KafkaProducer.producer);