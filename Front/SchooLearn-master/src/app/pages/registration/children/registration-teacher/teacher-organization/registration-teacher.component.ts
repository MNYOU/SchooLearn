import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IRegistrationUser } from "../../../../../modules/auth/interfaces/registration/registration-user.interface";
import { Role } from "../../../../../modules/auth/enums/role.enum";
import { Subscription } from "rxjs";
import { AuthService } from "../../../../../modules/auth/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AuthorizationUser,
  IAuthorizationUser
} from "../../../../../modules/auth/interfaces/auth/athorization-user.interface";
import { RegistrationTeacher } from "../../../../../modules/auth/interfaces/registration/registration-teacher.interface";

@Component({
  selector: 'app-registration-student',
  templateUrl: './registration-teacher.component.html',
  styleUrls: ['./registration-teacher.component.scss']
})
export class RegistrationTeacherComponent {
  constructor(public _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute
              ) { }

  public registrationTeacherForm: FormGroup = new FormGroup({
    companyName: new FormControl("", Validators.required),
    teacherKey: new FormControl("", Validators.required),
    teacherName: new FormControl("", Validators.required),
    teacherLogin: new FormControl("", Validators.required),
    teacherEmail: new FormControl("", Validators.required),
    teacherPassword: new FormControl("", Validators.required),
    repeatTeacherPassword: new FormControl("", Validators.required),
  });
  phase = 1;
  submitted: boolean = false;
  private _asyncSubscribeRegistration: Subscription = new Subscription(); //TODO: переделать без объявления
  private _asyncSubscribeAuthorization: Subscription = new Subscription();
  onSubmitRegistration() {
    this.submitted = true;
    const data: IRegistrationUser = new RegistrationTeacher(
      this.registrationTeacherForm.controls["companyName"].value,
      this.registrationTeacherForm.controls["teacherKey"].value,
      this.registrationTeacherForm.controls["teacherName"].value,
      this.registrationTeacherForm.controls["teacherLogin"].value,
      this.registrationTeacherForm.controls["teacherEmail"].value,
      this.registrationTeacherForm.controls["teacherPassword"].value,
      this.registrationTeacherForm.controls["repeatTeacherPassword"].value,
      Role.Teacher,
    );

    const user: IAuthorizationUser = new AuthorizationUser(
        this.registrationTeacherForm.controls["teacherLogin"].value,
        this.registrationTeacherForm.controls["teacherPassword"].value
      )

    this.registrationTeacherForm.disable();

    this._asyncSubscribeRegistration = this._authService.register2(data).subscribe({
      next: (value) => {
        this.registrationTeacherForm.reset();
        this.submitted = false;
      },

      error: (error) => {
        console.error("Ошибка регистрации");
        console.log(error);
        this.registrationTeacherForm.enable();
        this.submitted = false;
      },
    });

    this._asyncSubscribeAuthorization = this._authService.login2(user).subscribe({
      next: (value) => {
        this._authService.navigateLk(value.role)
        this.submitted = false;
      },

      error: (error) => {
        console.error("Ошибка авторизации");
        console.log(error);
      },
    });
  }

  // myForm!: FormGroup;
  //
  //
  // ngOnInit() {
  //   this.myForm = this.fb.group({
  //     name: ['', Validators.required],
  //     email: ['', Validators.email],
  //     age: ['', [Validators.required, Validators.min(18)]],
  //     address: this.fb.group({
  //       street: [''],
  //       city: [''],
  //       state: ['']
  //     })
  //   });
  // }

  nextPhase() {
    this.phase++;
  }

  prevPhase() {
    this.phase--;
  }

  ngOnDestroy(): void {
    this._asyncSubscribeRegistration.unsubscribe();
    this._asyncSubscribeAuthorization.unsubscribe();
  }

  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
  ];

  back() {

  }
}
