import {IRegistrationUser} from "./registration-user.interface";
import {Role} from "../../enums/role.enum";

export interface IRegistrationTeacher extends IRegistrationUser {
  key: string;
  email: string;
}

export class RegistrationTeacher implements IRegistrationTeacher {
  constructor(public organization: string,
              public key: string,
              public nickname: string,
              public login: string,
              public email: string,
              public password: string,
              public repeatPassword: string,
              public role: Role,
              readonly returnSecureToken: boolean = false) {
  }

  checkReturnSecureToken(): boolean {
    return this.returnSecureToken ? this.returnSecureToken : this.returnSecureToken;
  }
}
