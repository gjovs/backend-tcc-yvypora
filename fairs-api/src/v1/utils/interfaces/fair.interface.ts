import { IAddress } from "./address.interface";

export default interface IFair {
  name: string;
  dateAndHourOfWork: {
    open: string;
    close: string;
    dayOfWeek: {
      name: string;
      id: number;
    };
  }[];

  address: IAddress;
}
