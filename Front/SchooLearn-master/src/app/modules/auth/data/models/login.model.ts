import { Md5 } from 'ts-md5'
import {AuthorizationUser, IAuthorizationUser} from "../../interfaces/auth/athorization-user.interface";

export class LoginModel {
  public login!: string;
  public password!: string;

  public toDTO(): IAuthorizationUser {
    // return new AuthorizationUser(this.login, this.hashPassword(this.password));
    return  {
      login: this.login,
      password: this.hashPassword(this.password),
    };
  }

  private hashPassword(password: string): string {
    return Md5.hashStr(password + password).toString();
  }
}
