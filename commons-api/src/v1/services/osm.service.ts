import axios from "axios";
import { IAddress, IAddressOSM } from "../utils/interfaces";

class OSMService {
  private BASE_OSM_URL =
    "https://nominatim.openstreetmap.org/search?country=Brazil&q=";

  async getGeocoding(address: IAddress) {
    const addressObject: IAddressOSM = {
      city: address.city,
      cep: address.cep,
      complemento: address.complemento,
      neighborhood: address.neighborhood,
      uf: address.uf,
      number: address.number,
      logradouro: address.logradouro,
      latitude: 0,
      longitude: 0,
      addressTypeId: address.addressTypeId,
    };

    try {
      const addressToSearch = `${address.city}, ${
        address.uf
      }, ${address.logradouro.replace(" ", "+")}`;

      const latAndLonRes: {
        data: [
          {
            lat: string;
            lon: string;
          }
        ];
      } = await axios.get(
        `${this.BASE_OSM_URL}${addressToSearch}&format=json&limit=1`
      );

      addressObject.latitude = parseFloat(latAndLonRes.data[0].lat);
      addressObject.longitude = parseFloat(latAndLonRes.data[0].lon);

      return addressObject;
    } catch (e) {
      return false;
    }
  }
}

export default new OSMService();
