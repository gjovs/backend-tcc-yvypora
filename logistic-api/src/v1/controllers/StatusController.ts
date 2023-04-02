import { SocketStream } from "@fastify/websocket";
import { FastifyRequest } from "fastify";
import DeliverymanService from "../services/deliveryman.service";

class StatusController {
  async handleOnlineStatus(conn: SocketStream, req: FastifyRequest) {
    // @ts-ignore
    console.log(`${req.user.name} is connected`);    
    
    // @ts-ignore
    await DeliverymanService.status(true, req.user.id)

    conn.socket.on('close', () => {
      // @ts-ignore
      console.log(`${req.user.name} is disconnected`);    
      // @ts-ignore
      await DeliverymanService.status(false, req.user.id)
    })
  }

  // TODO add soundage in mongodb every 30 seconds update the list to see a new order done
}

export default new StatusController()
