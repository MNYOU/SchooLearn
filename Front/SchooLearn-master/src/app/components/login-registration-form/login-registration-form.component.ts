import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthorizationUser, IAuthorizationUser} from "../../modules/auth/interfaces/auth/athorization-user.interface";
import {IAuthResponseUserInterface} from "../../modules/auth/interfaces/auth/auth-responce-user.interface";
import {AuthService} from "../../modules/auth/services/auth.service";

@Component({
  selector: 'app-login-registration-form',
  templateUrl: './login-registration-form.component.html',
  styleUrls: ['./login-registration-form.component.scss']
})
export class LoginRegistrationFormComponent {
  constructor(public authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) { }
  private _asyncSubscribe!: Subscription;
  submitted: boolean = false;
  isLoginForm: boolean = true;
  @Output() onOpenRegistrationChanged = new EventEmitter();
  @Output() onCloseForm = new EventEmitter();
  @Output() onLogin: EventEmitter<boolean> = new EventEmitter();





  openRegistrationForm() {
    this.isLoginForm = false;
    this.onOpenRegistrationChanged.emit();
  }

  public authorizationForm: FormGroup = new FormGroup({
    userName: new FormControl("", Validators.required),
    userPassword: new FormControl("", [Validators.required, Validators.minLength(3)]),
  });

  role!: string;

  goToRegistrationPage() {
    this._router.navigate([`/registration/${this.role}`]).then();
    this.onCloseForm.emit();
  }

  onSubmitLogin() {
    this.submitted = true;

    const data: IAuthorizationUser = new AuthorizationUser(
      this.authorizationForm.controls["userName"].value,
      this.authorizationForm.controls["userPassword"].value,
    );

    this.authorizationForm.disable();
    this._asyncSubscribe = this.authService.login(data).subscribe({
      next: (value: IAuthResponseUserInterface) => {
        this.authService.navigateLk(value.role)
        this.authorizationForm.reset();
        this.submitted = false;
        this.onCloseForm.emit();
        this.onLogin.emit(true);
      },
      error: (error: Error) => {
        console.error("Ошибка авторизации");
        console.log(error);
        this.authorizationForm.enable();
        this.submitted = false;
      },
    });
  }

  ngOnDestroy(): void {
    this._asyncSubscribe?.unsubscribe();
  }
}

