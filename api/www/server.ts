import server from '../Server';
import Kafka from '../costumer/src/v1'

async function run() {
  await server.listen({
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
    host: '0.0.0.0',
  });

  // await Kafka.run()
}

run().then(() => {
  console.log('HTTP SERVER RUNNING');
});
