import jwt from "jsonwebtoken";
import DeliverymanService from "../services/deliveryman.service";
import { Server } from "socket.io";
import OrderService from "../services/order.service";

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

      console.log(decoded.payload.typeof)

      if (decoded.payload.typeof === "COSTUMER") {
        socket.join(String("costumer_" + decoded.payload.id.toString()));
        return null
      }

      const deliveryId: number = decoded.payload.id;

      await DeliverymanService.status(true, deliveryId);
      socket.join(String(deliveryId));

      socket.on("disconnect", async () => {
        await DeliverymanService.status(false, deliveryId);
      });

      socket.on("intent_of_travel", async (data: { accepted: boolean, order: any, routes: any }) => {
        console.log(decoded.payload.id);
        const { accepted, order, routes } = data

        if (accepted) {
          console.log(`ORDEM ${order.id} ACEITA POR ${decoded.payload.name}`);

          await OrderService.addDeliveryman({ deliverymanId: decoded.payload.id, intent_payment_id: order.intent_payment_id })

          const newOrder = await OrderService.get(order.intent_payment_id)

          // TODO notify the costumer
          this.sendMessage("costumer_" + order.costumer_addresses.costumerId.toString(), "travel_accepted", {
            accepted: true,
            order: newOrder,
            routes
          })

          return null
        }
        // TODO call the next one
      })

      socket.on("deliveryman_location_in_travel", async (data: { order: any, location: { latitude: number, longitude: number } }) => {
        const { order, location } = data

        // Notify the costumer of the new location
        this.sendMessage("costumer_" + order.costumer_addresses.costumerId.toString(), "track_of_order", {
          deliveryman_location: location
        })

        await DeliverymanService.updateLocation(order.deliverymanId, location)
      })

      socket.on("retreat_product_finished", async (order: any) => {
        this.sendMessage("costumer_" + order.costumer_addresses.costumerId.toString(), "updated_of_order", {
          retreat_products: true,
          order: { ...order, retreat_products_status: true }
        })
        await OrderService.retreatOfProducsCompleted(order.id)
      })

      // TODO add socket handler to arrived of deliveryman

      // TODO add message handler here
    });
  }

  sendMessage = (roomId: string, key: string, message: object) =>
    this.io.to(roomId).emit(key, message);

  getRooms = () => this.io.sockets.adapter.rooms;
}

export default SocketConnector;
