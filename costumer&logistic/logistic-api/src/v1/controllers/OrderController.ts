import OrderService from "../services/order.service";
import GoogleMapsService from "../services/googleMaps.service";
import DeliverymanService from "../services/deliveryman.service";
import { LatLng } from "@googlemaps/google-maps-services-js";
import { getMoreDistanceLocal, getMoreNeareastDeliverys } from "../utils/utils";
import { wss } from "../WebSocket";

class OrderController {
  async toQueue(args: { intent_payment_id: string }) {
    const { intent_payment_id } = args;
    const order = await OrderService.get(intent_payment_id);

    if (!order) {
      return false;
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

    if (!approachablesDeliverys) {
      return false;
    }

    const googleRoute = await GoogleMapsService.findRoutes({
      arrived: costumerLatLng,
      origin: waypoints[0], // deliveryman
      waypoints: waypoints,
    });

    if (!googleRoute) {
      return false;
    }

    console.info(googleRoute);
    console.info("lista de deliverys", listOfAvailableDeliverys);
    console.info("start point", startPoint);
    console.info("list de deliverys acesseveis", approachablesDeliverys);

    const roomId = approachablesDeliverys[0].id.toString();
    const data = { route: googleRoute.data, order };
    
    // send to best deliveryman
    wss.sendMessage(roomId, "intent_of_travel", data);

    return null;
  }
}

export default new OrderController();