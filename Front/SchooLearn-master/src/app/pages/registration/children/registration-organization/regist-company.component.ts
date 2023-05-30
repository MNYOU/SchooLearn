import { Component } from '@angular/core';
import {AuthService} from "../../../../modules/auth/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {
  IRegistrationOrganization,
  RegistrationOrganization
} from "../../../../modules/auth/interfaces/registration/registration-organization.interface";
import {emailValidator, innValidator, urlValidator} from "../components/validators";

@Component({
  selector: 'app-registration-company-page',
  templateUrl: './regist-company.component.html',
  styleUrls: ['./regist-company.component.scss']
})
export class RegistCompanyComponent {
  constructor(public _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  phase: number = 1;

  public registrationForm: FormGroup = new FormGroup({
    companyEmail: new FormControl("", [Validators.required, emailValidator()]),
    companyName: new FormControl("", Validators.required),
    companyINN: new FormControl("", [Validators.required, innValidator()]),
    companyUrl: new FormControl("", [Validators.required, urlValidator()])
  });

  private _asyncSubscribe: Subscription = new Subscription(); //TODO: переделать без объявления
  submitted: boolean = false;
  onSubmitRegistration() {
    this.submitted = true;
    const data: IRegistrationOrganization = new RegistrationOrganization(
      this.registrationForm.controls["companyName"].value,
      this.registrationForm.controls["companyEmail"].value,
      this.registrationForm.controls["companyINN"].value,
      this.registrationForm.controls["companyUrl"].value,
    );

    this.registrationForm.disable();
    this._asyncSubscribe = this._authService.registerCompany(data).subscribe({
      next: (value) => {
        this.phase++;
        this.registrationForm.reset();
        this.submitted = false;
      },

      error: (error) => {
        console.error("Ошибка регистрации");
        console.log(error);
        this.registrationForm.enable();
        this.submitted = false;
      },
    });
  }

  ngOnDestroy(): void {
    this._asyncSubscribe.unsubscribe();
  }
}
