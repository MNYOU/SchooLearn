import {Role} from "../../enums/role.enum";

export interface IAuthResponseUserInterface {
  email: string;
  nickName: string;
  login: string;
  institution?: IInstitution;
  role: Role;
  token: string,
  lifeTime: number;
}

export interface IInstitution {
  id: number;
  name: string;
}
