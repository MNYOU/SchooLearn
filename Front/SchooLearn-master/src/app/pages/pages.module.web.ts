import { NgModule } from "@angular/core";
import {AboutPageWeb} from "./about/about.page.web";
import {FAQPageWeb} from "./FAQ/FAQ.page.web";
import {HomePageWeb} from "./home/home.page.web";
import {RatingPageWeb} from "./rating/rating.page.web";
import {PrivateOfficePageWeb} from "./private-office/private-office.page.web";
import {LoginPageWeb} from "./login/login.page.web";
import {PageNotFoundPageWeb } from "./not-found/not-found-.page.web";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {SubjectsPageWeb} from "./tasks/childrens/subjects/subjects.page.web";
import {RouterLink, RouterOutlet} from "@angular/router";
import {TasksPageWeb} from "./tasks/childrens/tasks-home/tasks.component";
import {TasksPage} from "./tasks/tasks.page.web";
import {TaskPageWeb} from "./tasks/childrens/task/task.page.web";
import {
  RegistCompanyComponent
} from "./registration/children/registration-organization/regist-company.component";
import {
  RegistrationStudentComponent
} from "./registration/children/registration-student/registration-student.component";
import {
  RegistrationTeacherComponent
} from "./registration/children/registration-teacher/registration-teacher.component";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {SubtextComponent} from "./registration/children/components/subtext/subtext.component";
import {
  InformationRoleButtonsComponent
} from "../components/information-role-buttons/information-role-buttons.component";
import {HeadUniquePageComponent} from "../components/head-unique-page/head-unique-page.component";
import {RegistrationAdminComponent} from "./registration/children/registration-admin/registration-admin.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AboutPageWeb,
    FAQPageWeb,
    HomePageWeb,
    RatingPageWeb,
    TasksPageWeb,
    PrivateOfficePageWeb,
    LoginPageWeb,
    PageNotFoundPageWeb,
    SubjectsPageWeb,
    TasksPage,
    TaskPageWeb,
    RegistCompanyComponent,
    RegistrationStudentComponent,
    RegistrationTeacherComponent,
    SubtextComponent,
    InformationRoleButtonsComponent,
    HeadUniquePageComponent,
    RegistrationAdminComponent

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
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
    ],
  exports: [
    AboutPageWeb,
    FAQPageWeb,
    HomePageWeb,
    RatingPageWeb,
    TasksPageWeb,
    PrivateOfficePageWeb,
    PageNotFoundPageWeb,
    SubjectsPageWeb,
    TaskPageWeb,
  ]
})
export class PagesModuleWeb {}
