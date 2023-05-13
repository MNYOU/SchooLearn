// export interface IAuthUser {
//   email: string,
//   password: string,
//   returnSecureToken: boolean,
// }

export interface AuthResponseInterface {
  idToken: string,
  expiresIn?: string,
}

export interface IAuthUser {
  readonly name: string;
  email: string;
  password: string;
  phone: number;
  returnSecureToken?: boolean,
  checkReturnSecureToken(): boolean,
}

export class AuthUser implements IAuthUser{
  readonly name: string;
  public email: string;
  public password: string;
  public phone: number;
  public returnSecureToken?: boolean;

  constructor(name: string, email: string, password: string, phone: number, returnSecureToken: boolean) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.returnSecureToken = returnSecureToken;
  }

  checkReturnSecureToken(): boolean {
    return !!this.returnSecureToken;
  }

}
