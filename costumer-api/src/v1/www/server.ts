import server from '../Server';

async function run() {
  await server.listen({
    port: 3334,
  });
}

run();
