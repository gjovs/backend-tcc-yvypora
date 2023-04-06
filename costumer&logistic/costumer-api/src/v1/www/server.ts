import server from '../Server';
import KafkaProducer from '../Kafka'


async function run() {
  await server.listen({
    port: 3334,
  });

  await KafkaProducer.run()
}

run();

