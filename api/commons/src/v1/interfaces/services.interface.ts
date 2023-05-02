import { IAddressOSM } from "../domain/dto/OSMAddress";
import IAddress from "../domain/models/address";

export interface IFile {
  filename: string;
  mimetype: string;
  _buf: Buffer;
}

export interface IFirebaseService {
  uploadImage(fileParameter: IFile): Promise<string>;
}

export interface IOSMService {
  getGeocoding(address: IAddress): Promise<IAddressOSM | boolean>;
}
