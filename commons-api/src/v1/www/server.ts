import server from '../Server';

async function run() {
  await server.listen({
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
    host: '0.0.0.0',
  });
}

run().then(() => {
  console.log('HTTP SERVER RUNNING');
});
