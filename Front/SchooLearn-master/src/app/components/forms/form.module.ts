import { NgModule } from "@angular/core";
import {AuthorizationFormComponent} from "./authorizationForm/authorizationForm.component";
import {RegistrationFormComponent} from "./registrationForm/registrationForm.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../modules/auth/services/auth.service";
import {LoginFormComponent} from "./login-form/login.form.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {RegistrationOpenFormComponent} from "./registration-form/registration.open.form.component";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    AuthorizationFormComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    RegistrationOpenFormComponent
  ],
  imports: [
    HttpClientModule, // Для авторизации
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    MatSlideToggleModule,
    AsyncPipe,
    MatRadioModule,
  ],
  exports: [
    AuthorizationFormComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    RegistrationOpenFormComponent,
  ],
  providers: [AuthService],
})
export class MyFormsModule {}
