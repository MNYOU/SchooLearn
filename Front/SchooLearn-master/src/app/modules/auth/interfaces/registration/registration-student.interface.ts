import {IRegistrationUser} from "./registration-user.interface";

export interface IRegistrationStudent extends IRegistrationUser { }

export class RegistrationStudent implements IRegistrationStudent {
  constructor(
              public nickname: string,
              public login: string,
              public email: string,
              public role: 4 = 4,
              public password: string,
              public passwordConfirm: string) {}
}

