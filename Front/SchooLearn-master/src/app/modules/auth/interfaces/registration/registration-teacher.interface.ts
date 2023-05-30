import {IRegistrationUser} from "./registration-user.interface";

export interface IRegistrationTeacher extends IRegistrationUser {
  invitationCode: string;
}
export class RegistrationTeacher implements IRegistrationTeacher {
  constructor(public nickname: string,
              public login: string,
              public email: string,
              public role: 3 = 3,
              public password: string,
              public passwordConfirm: string,
              public invitationCode: string) {}
}
