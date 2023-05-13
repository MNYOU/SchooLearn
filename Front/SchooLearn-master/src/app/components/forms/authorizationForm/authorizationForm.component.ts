import { Component } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../modules/auth/services/auth.service";
import {AuthUser, IAuthUser} from "../../../modules/auth/interfaces/auth-response.interface";

@Component({
  selector: "app-authorizationForm",
  templateUrl: "./authorizationForm.component.html",
  styleUrls: ["authorizationForm.component.scss"]
})
export class AuthorizationFormComponent {
  constructor(private auth: AuthService) {
  }
  // public users: User[] = []; // для записи в список, для наглядности
    public authorizationForm: FormGroup = new FormGroup({
    userName: new FormControl("Ученик", Validators.required),
    userEmail: new FormControl("Почта", [Validators.required, Validators.email]),
    userPassword: new FormControl("Пароль", Validators.required),
    userPhone: new FormControl("Телефон", [Validators.required, Validators.pattern("[0-9]{10}")]), //использует регулярные выражения
  });

  public onSubmit() {
    const data: IAuthUser = new AuthUser(
      this.authorizationForm.controls["userName"].value,
      this.authorizationForm.controls["userEmail"].value,
      this.authorizationForm.controls["userPassword"].value,
      this.authorizationForm.controls["userPhone"].value,
      false
    )
    this.authorizationForm.disable();
    this.auth.login(data).subscribe(
      () => console.log("Успешная авторизация"),
      (error) => {
        console.error("Ошибка авторизации");
        console.log(error);
        this.authorizationForm.enable();
      },
    ); // можно использовать "this.authorizationForm.value", но смотри за названиями
    // this.users.push(data) // для записи в список, для наглядности
  }
}


