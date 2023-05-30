import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../../modules/auth/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthorizationUser, IAuthorizationUser} from "../../modules/auth/interfaces/auth/athorization-user.interface";

@Component({
  selector: "login-office",
  templateUrl: "login.page.web.html",
  styleUrls: ["login.page.web.scss"]
})
export class LoginPageWeb implements OnDestroy, OnInit {
  constructor(public _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.queryParams.subscribe((params: Params) => {
      if(params['registered']) {
        // Теперь вы можете войти в систему используя свои данные
      } else if (params['accessDenied']) {
        // Для начала авторизуйтесь в систему
      }
    })
  }

  public authorizationForm: FormGroup = new FormGroup({
    userName: new FormControl("", Validators.required),
    userPassword: new FormControl("", [Validators.required, Validators.minLength(3)]),
  });

  private _asyncSubscribe: Subscription = new Subscription(); //TODO: переделать без объявления

  submitted: boolean = false;

  public onSubmitLogin() {
    this.submitted = true;
    const data: IAuthorizationUser = new AuthorizationUser(
      this.authorizationForm.controls["userName"].value,
      this.authorizationForm.controls["userPassword"].value,
    );
    this.authorizationForm.disable();
    this._asyncSubscribe = this._authService.login(data).subscribe({
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
    }); // можно использовать "this.authorizationForm.value", но смотри за названиями
    // this.users.push(data) // для записи в список, для наглядности
    // next(x) {
    //     console.log('got value ' + x);
    //   },
    //   error(err) {
    //     console.error('something wrong occurred: ' + err);
    //   },
    //   complete() {
    //     console.log('done');
    //   },
  }
  ngOnDestroy(): void {
    if(this._asyncSubscribe)
      this._asyncSubscribe.unsubscribe();
  }
}
