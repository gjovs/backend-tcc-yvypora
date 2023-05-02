import {
  Client,
  DirectionsResponse,
  LatLng,
} from "@googlemaps/google-maps-services-js";

export interface ILocations {
  origin: LatLng;
  waypoints: LatLng[];
  arrived: LatLng;
}

class Maps {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  async findRoutes(locations: ILocations): Promise<DirectionsResponse | false> {
    try {
      if (locations.waypoints.length === 1) {
        const googleRes = await this.client.directions({
          params: {
            key: process.env.GOOGLE_MAPS_API_KEY as string,
            destination: locations.arrived,
            origin: locations.origin,
            mode: 'DRIVING'
          },
        });
        console.log("WITHOUT WAYPOINTS");

        return googleRes;
      }

      console.log("WITH WAYPOINTS");

      const googleRes = await this.client.directions({
        params: {
          key: process.env.GOOGLE_MAPS_API_KEY as string,
          destination: locations.arrived,
          waypoints: locations.waypoints,
          origin: locations.origin,
          
        },
      });

      return googleRes;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export default new Maps();
