import server from '../src/v1/Server';
import Kafka from '../src/v1/Kafka';

async function run() {
  await server.listen({
    port: process.env.PORT ? Number(process.env.PORT) : 8080,
    host: '0.0.0.0',
  });

  await Kafka.run();
}

run().then(() => {
  console.log('HTTP SERVER RUNNING');
});
