import { ILocation } from "../dto/Location";

export interface IMarketer {
  id?: number;
  name: string;
  cnpj?: string | null;
  cpf?: string | null;
  email: string;
  password: string | null;
  phone: string;
  birthday: string;
  location?: ILocation;
  gender?: string | number;
  tent_name?: string;
}
