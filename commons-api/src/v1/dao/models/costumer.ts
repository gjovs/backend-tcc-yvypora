export default interface ICostumer<address> {
  password: string;
  name: string;
  email: string;
  gender: string | number;
  birthday: string;
  cpf: string,
  address: address;
}
