import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../../modules/auth/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorizationUser, IAuthorizationUser} from "../../../modules/auth/interfaces/auth/athorization-user.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-form',
  templateUrl: 'login.form.component.html',
  styleUrls: ['login.form.component.scss']
})
export class LoginFormComponent {

  constructor(public _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  @Output() registrationForm = new EventEmitter<boolean>();

  private _asyncSubscribe!: Subscription;
  submitted: boolean = false;

  openRegistrationForm() {
    this.registrationForm.emit();
  }

  public authorizationForm: FormGroup = new FormGroup({
    userName: new FormControl("", Validators.required),
    userPassword: new FormControl("", [Validators.required, Validators.minLength(3)]),
  });

  public onSubmitLogin2() {
    this.submitted = true;
    const data: IAuthorizationUser = new AuthorizationUser(
      this.authorizationForm.controls["userName"].value,
      this.authorizationForm.controls["userPassword"].value,
    );
    this.authorizationForm.disable();
    this._asyncSubscribe = this._authService.login2(data).subscribe({
      next: (value) => {
        this._authService.navigateLk(value.role)
        this.authorizationForm.reset();
        // this._router.navigate(['/lk']).then(); // переход на лк
        this.submitted = false;
      },

      error: (error) => {
        console.error("Ошибка авторизации");
        console.log(error);
        this.authorizationForm.enable();
        this.submitted = false;
      },
    });
  }

  ngOnDestroy(): void {
    if(this._asyncSubscribe)
      this._asyncSubscribe.unsubscribe();
  }
}
