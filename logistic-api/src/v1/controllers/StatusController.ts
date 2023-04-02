import { SocketStream } from "@fastify/websocket";
import { FastifyRequest } from "fastify";
import DeliverymanService from "../services/deliveryman.service";

class StatusController {
  async handleOnlineStatus(conn: SocketStream, req: FastifyRequest) {
    // @ts-ignore
    console.log(`${req.user.name} is connected`);    
    
    // @ts-ignore
    DeliverymanService.status(true, req.user.id)

    conn.socket.on('close', () => {
      // @ts-ignore
      console.log(`${req.user.name} is disconnected`);    
      // @ts-ignore
      DeliverymanService.status(false, req.user.id)
    })
  }

  // TODO handle new travel order
}

export default new StatusController()
