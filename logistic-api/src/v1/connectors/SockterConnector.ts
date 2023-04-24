import jwt from "jsonwebtoken";
import DeliverymanService from "../services/deliveryman.service";
import { Server } from "socket.io";
import OrderService from "../services/order.service";
import StatusService from "../services/status.service";

import {
  IDeliveryLocationInTravel,
  IMessage,
  IOrderArrived,
  IRetreatProductFinished,
  IntentOfTravel,
} from "../interfaces/interfaces";

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
      console.log(decoded.payload);

      if (decoded.payload.typeof === "COSTUMER") {
        socket.join(String("costumer_" + decoded.payload.id.toString()));
        console.log("new costumer is online");
        return;
      }

      if (decoded.payload.typeof === "MARKETER") {
        socket.join(String("marketer_" + decoded.payload.id.toString()));
        console.log("new marketer is online");
        await StatusService.marketer(true, decoded.payload.id);
        return;
      }
      console.log("new deliveryman is online");

      const deliveryId: number = decoded.payload.id;

      await StatusService.deliveryman(true, deliveryId);
      socket.join(String(deliveryId));

      socket.on("disconnect", async () => {
        if (decoded.payload.typeof === "MARKETER")
          await StatusService.marketer(false, decoded.payload.id);
        else await StatusService.deliveryman(false, deliveryId);
      });

      socket.on("intent_of_travel", async (data: IntentOfTravel) => {
        console.log(decoded.payload.id);

        const { accepted, order, routes } = data;

        if (accepted) {
          console.log(`ORDEM ${order.id} ACEITA POR ${decoded.payload.name}`);

          await OrderService.addDeliveryman({
            deliverymanId: decoded.payload.id,
            intent_payment_id: order.intent_payment_id,
          });

          const newOrder = await OrderService.get(order.intent_payment_id);

          this.sendMessage(
            "costumer_" + order.costumer_addresses.costumerId.toString(),
            "travel_accepted",
            {
              accepted: true,
              order: newOrder,
              routes,
            }
          );

          return null;
        }
        // TODO call the next one
      });

      socket.on(
        "deliveryman_location_in_travel",
        async (data: IDeliveryLocationInTravel) => {
          const { order, location } = data;

          // Notify the costumer of the new location
          this.sendMessage(
            "costumer_" + order.costumer_addresses.costumerId.toString(),
            "track_of_order",
            {
              deliveryman_location: location,
            }
          );

          await DeliverymanService.updateLocation(
            order.deliverymanId,
            location
          );
        }
      );

      socket.on(
        "retreat_product_finished",
        async (data: IRetreatProductFinished) => {
          const { order } = data;
          this.sendMessage(
            "costumer_" + order.costumer_addresses.costumerId.toString(),
            "updated_of_order",
            {
              retreat_products: true,
              order: { ...order, retreat_products_status: true },
            }
          );
          await OrderService.retreatOfProducsCompleted(order.id);
        }
      );

      socket.on("order_arrived", async (args: IOrderArrived) => {
        const { order } = args;
        const costumerID = order.costumer_addresses.costumerId.toString();
        this.sendMessage(costumerID, "order_arrived", {
          ...order,
          delivered_status_for_client: true,
        });
      });

      socket.on("confirm_order_arrived", async (args: IOrderArrived) => {
        const { order } = args;

        await OrderService.acceptOrder(order.id);

        this.sendMessage(order.deliverymanId.toString(), "accept_order", {
          accepted: true,
          value_received: order.shopping_list.freight,
        });
      });

      socket.on("send_message", async (args: IMessage) => {
        const { content, from, to, timestamp } = args;

        if (decoded.payload.typeof === "COSTUMER")
          this.sendMessage(String(to), "chat_message", { from, content });
        else
          this.sendMessage(`costumer_${to}`, "chat_message", { from, content });

        // add saving in mongo db database ><
      });
    });
  }

  sendMessage = (roomId: string, key: string, message: object) =>
    this.io.to(roomId).emit(key, message);

  getRooms = () => this.io.sockets.adapter.rooms;
}

export default SocketConnector;
