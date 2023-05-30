import {IRegistrationUser} from "./registration-user.interface";

export interface IRegistrationAdmin extends IRegistrationUser {
  invitationCode: string;
}

export class RegistrationAdmin implements IRegistrationAdmin {
  constructor(public nickname: string,
              public login: string,
              public email: string,
              public role: 2 = 2,
              public password: string,
              public passwordConfirm: string,
              public invitationCode: string) {}
}
