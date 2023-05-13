import {Role} from "../../enums/role.enum";

export interface IRegistrationUser {
  role: Role;
  nickname: string;
  organization: string;
  login: string;
  password: string;
  repeatPassword: string;
  returnSecureToken?: boolean;
  checkReturnSecureToken(): boolean;
}
