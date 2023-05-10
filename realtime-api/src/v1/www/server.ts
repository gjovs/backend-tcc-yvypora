import KafkaConsumer from '../Kafka';
import server from '../Server';
import serverWss from '../WebSocket';

async function run() {
  await server.listen({
    port: 3336,
  });

  await KafkaConsumer.start();
  await KafkaConsumer.runConsumer();
}

async function runSocket() {
  serverWss.listen(3337, () => {
    console.log('Websocket server running');
  });
}

run();
runSocket();
