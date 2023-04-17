import { Consumer, Kafka, logLevel  } from 'kafkajs'
import { OrderController } from './controllers/index'
class KafkaConsumer {
    private kafka: Kafka
    public consumer: Consumer | undefined

    constructor(args: { clientId: string, brokers: string[]}) {
        this.kafka = new Kafka({...args, logLevel: logLevel.NOTHING })       
        this.initConsumer()
    }
    
    private initConsumer() {
        this.consumer = this.kafka.consumer({ groupId: 'logistic-group' })
    }

    public async start() {
        await this.consumer?.connect()
        await this.consumer?.subscribe({ topic: 'payment_intent' })
    } 
    
    public async runConsumer() {
        await this.consumer?.run({
            eachMessage: async ({ topic, partition, message}) => {
                // @ts-ignore
                const payload = JSON.parse(message.value)
                
                console.log(payload);
                
                await OrderController.toQueue(payload.intent_payment_id)
            }
        })
    }
}


export default new KafkaConsumer({ clientId: 'logistic', brokers: ['localhost:9092']})