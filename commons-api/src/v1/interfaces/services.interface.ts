import { IAddressOSM } from "../domain/dto/OSMAddress";
import IAddress from "../domain/models/address";

export interface IFirebaseService {
  uploadImage(fileParameter: string): Promise<string>;
}

export interface IOSMService {
  getGeocoding(address: IAddress): Promise<IAddressOSM | boolean>;
}
