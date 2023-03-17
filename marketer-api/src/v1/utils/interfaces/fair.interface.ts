export default interface IFair {

  name: string,
  dateAndHourOfWork: {
    open: string;
    close: string;
    dayOfWeek: {
      name: string;
      id: number;
    };
  }[];

  address: {
    cep: string;
    complemento: string;
    addressTypeId: number;
    number: number;
    city: string;
    uf: string;
    neighborhood: string;
    logradouro: string;
  };
};
