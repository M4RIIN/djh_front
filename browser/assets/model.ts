export interface Invoice{
  code:string;
  due:string;
  who:string;
  price:number;
  status:string;
}

export class User {
  _id!: String;
  name!: String;
  email!: String;
  password!: String;
}
