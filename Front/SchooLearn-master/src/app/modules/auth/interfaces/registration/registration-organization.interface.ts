export interface IRegistrationOrganization {
  readonly email: string;
  readonly name: string;
  readonly inn: number;
  readonly addressUrl: string;
}

export class RegistrationOrganization implements IRegistrationOrganization{
  constructor(readonly email: string, readonly name: string, readonly inn: number, readonly addressUrl: string) { }
}
