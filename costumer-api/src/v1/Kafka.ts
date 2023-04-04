import { Kafka, logLevel, Producer } from 'kafkajs'

class KafkaProducer {
    private kafka: Kafka
    public producer!: Producer 
    
    constructor(args: { clientId: string, brokers: string[]}) {
        this.kafka = new Kafka({...args, logLevel: logLevel.DEBUG, retry: {
            initialRetryTime: 300,
            retries: 10
        }})       
        this.initProducer()
    }
    
    private initProducer() {
        this.producer = this.kafka.producer()
    }

    public async run() {
        await this.producer?.connect()
    }   
}


export default new KafkaProducer({ clientId: 'api', brokers: ['localhost:9095']})