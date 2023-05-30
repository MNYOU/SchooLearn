import { Component } from '@angular/core';
import {AuthService} from "../../../../modules/auth/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {IRegistrationUser} from "../../../../modules/auth/interfaces/registration/registration-user.interface";
import {RegistrationAdmin} from "../../../../modules/auth/interfaces/registration/registration-admin.interface";
import {Location} from "@angular/common";
import {
  confirmPasswordValidator,
  emailValidator,
  loginValidator,
  passwordValidator,
  usernameValidator
} from "../components/validators";

@Component({
  selector: 'app-registration-admin',
  templateUrl: './registration-admin.component.html',
  styleUrls: ['./registration-admin.component.scss']
})
export class RegistrationAdminComponent {
  constructor(private location: Location,
              public _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute
  ) { }
  institution$?: Observable<{id: number, name: string}[]>;

  ngOnInit() {
    this.institution$ = this._authService.getInstitution();
  }

  public registrationTeacherForm: FormGroup = new FormGroup({
    companyName: new FormControl("", Validators.required),
    teacherKey: new FormControl("", Validators.required),
    teacherName: new FormControl("", [Validators.required, usernameValidator()]),
    teacherLogin: new FormControl("", [Validators.required, loginValidator()]),
    teacherEmail: new FormControl("", [Validators.required, emailValidator()]),
    teacherPassword: new FormControl("", [Validators.required, passwordValidator()]),
    repeatTeacherPassword: new FormControl("", [Validators.required, passwordValidator(), confirmPasswordValidator("teacherPassword")]),
  });
  phase = 1;
  submitted: boolean = false;
  private _asyncSubscribeRegistration: Subscription = new Subscription(); //TODO: переделать без объявления

  onSubmitRegistration() {
    this.submitted = true;
    const data: IRegistrationUser = new RegistrationAdmin(
      this.registrationTeacherForm.controls["teacherName"].value,
      this.registrationTeacherForm.controls["teacherLogin"].value,
      this.registrationTeacherForm.controls["teacherEmail"].value,
      2,
      this.registrationTeacherForm.controls["teacherPassword"].value,
      this.registrationTeacherForm.controls["repeatTeacherPassword"].value,
      this.registrationTeacherForm.controls["teacherKey"].value,
    );

    this.registrationTeacherForm.disable();

    this._asyncSubscribeRegistration = this._authService.registerTeacher(data).subscribe({
      next: (value) => {
        this.registrationTeacherForm.reset();
        this.submitted = false;
        this._router.navigate(['']);
      },

      error: (error) => {
        console.error("Ошибка регистрации");
        console.log(error);
        this.registrationTeacherForm.enable();
        this.submitted = false;
      },
    });
  }

  nextPhase() {
    this.phase++;
  }

  prevPhase() {
    this.phase--;
  }

  ngOnDestroy(): void {
    this._asyncSubscribeRegistration.unsubscribe();
  }

  back() {
    this.location.back();
  }
}
