export interface IRegistrationUser {
  nickname: string;
  login: string;
  email: string;
  role: 2 | 3 | 4;
  password: string;
  passwordConfirm: string,
}
