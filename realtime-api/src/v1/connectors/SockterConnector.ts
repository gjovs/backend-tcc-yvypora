import jwt from 'jsonwebtoken';
import DeliverymanService from '../services/deliveryman.service';
import { Server } from 'socket.io';
import OrderService from '../services/order.service';
import StatusService from '../services/status.service';

import {
  IDeliveryLocationInTravel,
  IMessage,
  IOrderArrived,
  IRetreatProductFinished,
  IntentOfTravel,
} from '../domain/interfaces';
import DecodedToken from '../domain/dto/DecodedToken';
import { TypeOfUser } from '../domain/dto/TypeOfUser';
import { ChatRepository } from '../domain/repositories';
import { log } from 'console';

class SocketConnector {
  public io: Server;

  constructor(server, props) {
    Promise.resolve(this.socketConnection(server, props));
  }

  async validateToken(
    token: string
  ): Promise<{ payload: DecodedToken } | undefined> {
    try {
      const decoded: { payload: DecodedToken } = (await jwt.verify(
        token,
        '12313123123'
      )) as {
        payload: DecodedToken;
      };
      return decoded;
    } catch (error) {
      if (error instanceof Error) {
        return undefined;
      }
    }
  }
  async socketConnection(server, props) {
    this.io = require('socket.io')(server, props);

    this.io.on('connection', async (socket) => {
      const { token } = socket.handshake.query;

      const decoded = await this.validateToken(token as string);

      if (!decoded) {
        socket.disconnect();
        return;
      }

      const { id, typeof: role, name } = decoded.payload;

      console.log(id, role, name);

      switch (role) {
        case 'COSTUMER':
          socket.join(`costumer_${id}`);
          console.log(`New costumer (${id}) is online.`);
          break;

        case 'MARKETER':
          socket.join(`marketer_${id}`);
          console.log(`New marketer (${id}) is online.`);
          await StatusService.marketer(true, id);
          break;

        case 'DELIVERYMAN':
          socket.join(`${id}`);
          console.log(`New deliveryman (${id}) is online.`);
          await StatusService.deliveryman(true, id);
          break;
      }

      socket.on('disconnect', async () => {
        if (decoded?.payload.typeof === TypeOfUser.MARKETER)
          await StatusService.marketer(false, decoded.payload.id);
        else if (decoded?.payload.typeof === TypeOfUser.DELIVERYMAN)
          await StatusService.deliveryman(false, decoded.payload.id);
      });

      socket.on('intent_of_travel', async (data: IntentOfTravel) => {
      

        const { accepted, order, routes } = data;

        if (accepted) {
          console.log(`ORDEM ${order.id} ACEITA POR ${decoded?.payload.name}`);

          await OrderService.addDeliveryman({
            deliverymanId: decoded?.payload.id as number,
            intent_payment_id: order.intent_payment_id,
          });

          const newOrder = await OrderService.get(order.intent_payment_id);

    

          this.sendMessage(
            'costumer_' + order.shopping_list.costumerId.toString(),
            'travel_accepted',
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
        'deliveryman_location_in_travel',
        async (data: IDeliveryLocationInTravel) => {
          const { order, location } = data;

          // Notify the costumer of the new location
          this.sendMessage(
            'costumer_' + order.costumer_addresses.costumerId.toString(),
            'track_of_order',
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
        'retreat_product_finished',
        async (data: IRetreatProductFinished) => {
          const { order } = data;
          this.sendMessage(
            'costumer_' + order.costumer_addresses.costumerId.toString(),
            'updated_of_order',
            {
              retreat_products: true,
              order: { ...order, retreat_products_status: true },
            }
          );
          await OrderService.retreatOfProducsCompleted(order.id);
        }
      );

      socket.on('order_arrived', async (args: IOrderArrived) => {
        const { order } = args;
        const costumerID = order.costumer_addresses.costumerId.toString();
        this.sendMessage(`costumer_${costumerID}`, 'order_arrived', {
          ...order,
          delivered_status_for_client: true,
        });
      });

      socket.on('confirm_order_arrived', async (args: IOrderArrived) => {
        const { order } = JSON.parse(JSON.stringify(args.toString()))
        
        console.log(order, args);
        
        await OrderService.acceptOrder(order.id);

        this.sendMessage(order.deliverymanId.toString(), 'accept_order', {
          accepted: true,
          value_received: order.shopping_list.freight,
        });
      });

      socket.on('send_message', async (args: IMessage) => {
        const { content, from, to, fromName, toName,timestamp } = args;

        log(args)

        if (decoded?.payload.typeof === TypeOfUser.COSTUMER)
          this.sendMessage(String(to), 'chat_message', { from, content });
        else
          this.sendMessage(`costumer_${to}`, 'chat_message', { from, content });

        const res = await ChatRepository.save(args);
        console.log(res);
        
      });
    });
  }

  sendMessage = (roomId: string, key: string, message: object) =>
    this.io.to(roomId).emit(key, message);

  getRooms = () => this.io.sockets.adapter.rooms;
}

export default SocketConnector;
