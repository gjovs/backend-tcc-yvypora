import { Client, DirectionsResponse, LatLng } from '@googlemaps/google-maps-services-js';

export interface ILocations {
  origin: LatLng,
  waypoints: LatLng[],
  arrived: LatLng,
}
class Maps {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  async findRoutes(locations: ILocations): Promise<DirectionsResponse> {
    const googleRes = await this.client.directions({
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY as string,
        waypoints: locations.waypoints,
        destination: locations.arrived,
        origin: locations.origin,
      },
    });

    return googleRes;
  }

  async getCoordinates(address: string) {
    const googleRes = await this.client.ge;
  }
}

export default new Maps();
