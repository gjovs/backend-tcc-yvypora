import { FastifyReply, FastifyRequest } from "fastify";
import OrderService from "../services/order.service";
import GoogleMapsService from "../services/googleMaps.service";
import { LatLng } from "@googlemaps/google-maps-services-js";
import { getMoreDistanceLocal, getMoreNeareastDeliverys } from "../utils/utils";
import DeliverymanService from "../services/deliveryman.service";

class OrderController {
  async toQueue(
    req: FastifyRequest<{
      Params: {
        intent_payment_id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { intent_payment_id } = req.params;

    const order = await OrderService.get(intent_payment_id);

    if (!order) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: "This order does not exist!",
      });
    }

    const costumerLatLng: LatLng = [
      order.costumer_addresses.address.location.latitude,
      order.costumer_addresses.address.location.longitude,
    ];

    const waypoints: LatLng[] =
      order.shopping_list.products_in_shopping_list.map(({ product }) => {
        return [
          product.marketer.location.latitude,
          product.marketer.location.longitude,
        ];
      });

    const startPoint = getMoreDistanceLocal(
      {
        latitude: costumerLatLng[0],
        longitude: costumerLatLng[1],
      },
      waypoints.map((waypoints_coordinates) => {
        return {
          latitude: waypoints_coordinates[0],
          longitude: waypoints_coordinates[1],
        };
      })
    );

    const listOfAvailableDeliverys = await DeliverymanService.listByOnline();

    const approachablesDeliverys = getMoreNeareastDeliverys(
      { latitude: startPoint[0], longitude: startPoint[1] },
      listOfAvailableDeliverys.map((deliveryman) => {
        return {
          id: deliveryman.id,
          latitude: deliveryman.location.latitude,
          longitude: deliveryman.location.longitude,
        };
      })
    );

    const googleRoute = await GoogleMapsService.findRoutes({
      arrived: costumerLatLng,
      origin: waypoints[0], // deliveryman
      waypoints: waypoints,
    });

    console.info(googleRoute);
    console.info("lista de deliverys", listOfAvailableDeliverys);
    console.info("start point", startPoint);
    console.info("list de deliverys acesseveis", approachablesDeliverys);

    // TODO send info to best approachable deliveryman
    // add mongoDB
    // convert this info to json string
    // bind this to websocket (connect to mongoDB this data and make the websocket soundage or event) 

    return rep.status(201).send();
  }
}

export default new OrderController();
