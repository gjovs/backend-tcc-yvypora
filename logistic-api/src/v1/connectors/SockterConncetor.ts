import jwt from "jsonwebtoken";
import DeliverymanService from "../services/deliveryman.service";
import { Server } from "socket.io";

class SocketConnector {
  public io: Server;

  constructor(server, props) {
    Promise.resolve(this.socketConnection(server, props));
  }

  async socketConnection(server, props) {
    this.io = require("socket.io")(server, props);

    this.io.on("connection", async (socket) => {
      let decoded;

      if (socket.handshake.query && socket.handshake.query.token) {
        await jwt.verify(
          socket.handshake.query.token,
          "12313123123",
          function (err, _decoded) {
            if (err) {
              console.log(err);

              socket.disconnect();
              return false;
            }
            decoded = _decoded;
          }
        );
      } else {
        socket.disconnect();
        return false;
      }

      const deliveryId: number = decoded.payload.id;

      await DeliverymanService.status(true, deliveryId);
      socket.join(String(deliveryId));

      socket.on("disconnect", async () => {
        await DeliverymanService.status(false, deliveryId);
      });
    });
  }

  sendMessage = async (roomId: string, key: string, message: object) =>
    this.io.to(roomId).emit(key, message);

  getRooms = () => this.io.sockets.adapter.rooms;
}

export default SocketConnector;
