import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../../../modules/auth/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {
  IRegistrationOrganization, RegistrationOrganization
} from "../../../../../../modules/auth/interfaces/registration/registration-organization.interface";

@Component({
  selector: 'app-step1-registration-company-form',
  templateUrl: './step1-registration-company-form.component.html',
  styleUrls: ['./step1-registration-company-form.component.scss']
})
export class Step1RegistrationCompanyFormComponent {
  constructor(public _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  public registrationForm: FormGroup = new FormGroup({
    companyEmail: new FormControl("", Validators.required),
    companyName: new FormControl("", Validators.required),
    companyINN: new FormControl("", Validators.required),
    companyUrl: new FormControl("", Validators.required),
  });

  private _asyncSubscribe: Subscription = new Subscription(); //TODO: переделать без объявления
  submitted: boolean = false;

  onSubmitRegistration() {
    this.submitted = true;
    const data: IRegistrationOrganization = new RegistrationOrganization(
      this.registrationForm.controls["companyEmail"].value,
      this.registrationForm.controls["companyName"].value,
      this.registrationForm.controls["companyINN"].value,
      this.registrationForm.controls["companyUrl"].value,
    );

    this.registrationForm.disable();
    this._asyncSubscribe = this._authService.registerCompany(data).subscribe({
      next: (value) => {
        this.registrationForm.reset();
        this._router.navigate(['/registration/company/step2']);
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
