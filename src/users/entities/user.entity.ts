export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;

  constructor(userData: {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    id?: string;
  }) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.cpf = userData.cpf;
    this.phone = userData.phone;
  }
}
