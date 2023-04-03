import server from "../Server";
import serverWss from "../WebSocket";

async function run() {
  await server.listen({
    port: 3336,
  });
}

async function runSocket() {
  serverWss.listen(3337, () => {
    console.log("Websocket server running");
  });
}

run();
runSocket();
