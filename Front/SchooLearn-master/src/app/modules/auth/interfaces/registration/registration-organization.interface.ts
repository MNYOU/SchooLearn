export interface IRegistrationOrganization {
  readonly name: string;
  readonly email: string;
  readonly tin: number;
  readonly webAddress: string;
}

export class RegistrationOrganization implements IRegistrationOrganization{
  constructor(readonly name: string, readonly email: string, readonly tin: number, readonly webAddress: string) { }
}
