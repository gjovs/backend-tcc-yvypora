export interface IAddressOSM {
  logradouro: string;
  cep: string;
  uf: string;
  city: string;
  neighborhood: string;
  complemento: string;
  number: number;
  addressTypeId: number;
  latitude: number;
  longitude: number;
}

export interface IAddress {
  cep: string;
  complemento: string;
  addressTypeId: number;
  number: number;
  city: string;
  uf: string;
  neighborhood: string;
  logradouro: string;
}
