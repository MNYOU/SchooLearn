export interface IAuthorizationUser {
  readonly login: string;
  readonly password: string;
}

export class AuthorizationUser implements IAuthorizationUser{
  constructor(readonly login: string, readonly password: string, readonly returnSecureToken: boolean = false) { }
}
