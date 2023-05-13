import {IRegistrationUser} from "./registration-user.interface";
import {Role} from "../../enums/role.enum";

export interface IRegistrationStudent extends IRegistrationUser { }

export class RegistrationStudent implements IRegistrationStudent {
  constructor(public organization: string,
              public nickname: string,
              public login: string,
              public password: string,
              public repeatPassword: string,
              public role: Role,
              readonly returnSecureToken: boolean = false) {
  }

  checkReturnSecureToken(): boolean {
    return this.returnSecureToken ? this.returnSecureToken : this.returnSecureToken;
  }
}
