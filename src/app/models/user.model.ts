import { Roles } from './roles.model'

export class User{
  id: Number |undefined;
  username: string="";
  email: string ="";
  password:  string="";
  confirm_password: string="";
  imageUser: string="";
  roles: Roles =Roles.ROLE_USER;
  token: string="";
}
