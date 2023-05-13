import { NgModule } from "@angular/core";
import {AboutPageWeb} from "./about/about.page.web";
import {FAQPageWeb} from "./FAQ/FAQ.page.web";
import {HomePageWeb} from "./home/home.page.web";
import {RatingPageWeb} from "./rating/rating.page.web";
import {PrivateOfficePageWeb} from "./private-office/private-office.page.web";
import {RegistrationPageWeb} from "./registration/registration.page.web";
import {LoginPageWeb} from "./login/login.page.web";
import {PageNotFoundPageWeb } from "./not-found/not-found-.page.web";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {SubjectsPageWeb} from "./tasks/childrens/subjects/subjects.page.web";
import {RouterLink, RouterOutlet} from "@angular/router";
import {TasksPageWeb} from "./tasks/childrens/tasks-home/tasks.component";
import {TasksPage} from "./tasks/tasks.page.web";
import {TaskPageWeb} from "./tasks/childrens/subjects/childrens/task/task.page.web";
import {
  Step1RegistrationCompanyFormComponent
} from "./registration/children/registration-organization/children/step1-registration-company-form/step1-registration-company-form.component";
import {
  Step2RegistrationCompanyFormComponent
} from "./registration/children/registration-organization/children/step2-registration-company-form/step2-registration-company-form.component";
import {
  RegistrationCompanyPageComponent
} from "./registration/children/registration-organization/registration-company-page/registration-company-page.component";
import {
  RegistrationStudentComponent
} from "./registration/children/registration-student/registration-student/registration-student.component";
import {
  RegistrationTeacherComponent
} from "./registration/children/registration-teacher/teacher-organization/registration-teacher.component";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {SubtextComponent} from "./registration/children/components/subtext/subtext.component";
import {AppModule} from "../app.module";
import {
  InformationRoleButtonsComponent
} from "../components/information-role-buttons/information-role-buttons.component";
import {HeadUniquePageComponent} from "../components/head-unique-page/head-unique-page.component";

@NgModule({
  declarations: [
    AboutPageWeb,
    FAQPageWeb,
    HomePageWeb,
    RatingPageWeb,
    TasksPageWeb,
    PrivateOfficePageWeb,
    RegistrationPageWeb,
    LoginPageWeb,
    PageNotFoundPageWeb,
    SubjectsPageWeb,
    TasksPage,
    TaskPageWeb,
    Step1RegistrationCompanyFormComponent,
    Step2RegistrationCompanyFormComponent,
    RegistrationCompanyPageComponent,
    RegistrationStudentComponent,
    RegistrationTeacherComponent,
    SubtextComponent,
    InformationRoleButtonsComponent,
    HeadUniquePageComponent
  ],
    imports: [
        ReactiveFormsModule, // TODO: потом удалить, после СОЗДАНИЯ МОДУЛЯ ДЛЯ ЛОГИНА
        BrowserModule,
        FormsModule,
        RouterOutlet,
        BrowserAnimationsModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        PerfectScrollbarModule,
        RouterLink,
    ],
  exports: [
    AboutPageWeb,
    FAQPageWeb,
    HomePageWeb,
    RatingPageWeb,
    TasksPageWeb,
    PrivateOfficePageWeb,
    RegistrationPageWeb,
    PageNotFoundPageWeb,
    SubjectsPageWeb,
    TaskPageWeb,
  ]
})
export class PagesModuleWeb {}
