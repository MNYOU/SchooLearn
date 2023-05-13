import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageWeb } from "./pages/home/home.page.web";
import { AboutPageWeb } from "./pages/about/about.page.web";
import {TasksPage} from "./pages/tasks/tasks.page.web";
import { RatingPageWeb } from "./pages/rating/rating.page.web";
import { FAQPageWeb } from "./pages/FAQ/FAQ.page.web";
import {PrivateOfficePageWeb} from "./pages/private-office/private-office.page.web";
import {RegistrationPageWeb} from "./pages/registration/registration.page.web";
import {LoginPageWeb} from "./pages/login/login.page.web";
import {PageNotFoundPageWeb} from "./pages/not-found/not-found-.page.web";
import {SiteLayoutComponent} from "./layouts/site-layout/site-layout.component";
import {AuthGuard} from "./modules/auth/guards/auth.guard";
import {Role} from "./modules/auth/enums/role.enum";
import {SubjectsPageWeb} from "./pages/tasks/childrens/subjects/subjects.page.web";
import {TasksPageWeb} from "./pages/tasks/childrens/tasks-home/tasks.component";
import {TaskPageWeb} from "./pages/tasks/childrens/subjects/childrens/task/task.page.web";
import {
  Step1RegistrationCompanyFormComponent
} from "./pages/registration/children/registration-organization/children/step1-registration-company-form/step1-registration-company-form.component";
import {
  Step2RegistrationCompanyFormComponent
} from "./pages/registration/children/registration-organization/children/step2-registration-company-form/step2-registration-company-form.component";
import {
  RegistrationCompanyPageComponent
} from "./pages/registration/children/registration-organization/registration-company-page/registration-company-page.component";
import {
  RegistrationStudentComponent
} from "./pages/registration/children/registration-student/registration-student/registration-student.component";
import {
  RegistrationTeacherComponent
} from "./pages/registration/children/registration-teacher/teacher-organization/registration-teacher.component";

const tasksRoutes: Routes = [
  { path: '', component: TasksPageWeb},
  { path: 'subjects', component: SubjectsPageWeb},
  { path: 'subjects/:subjectName', component: TaskPageWeb },
];





const lkRoutes: Routes = [
  {
    path: 'lk-student',
    canActivate: [AuthGuard],
    component: PrivateOfficePageWeb,
    data: { roles: [Role.Student] }
  }, // использует guard
  {
    path: 'lk-teacher',
    canActivate: [AuthGuard],
    component: PrivateOfficePageWeb,
    data: { roles: [Role.Teacher] }
  }, //Использует guard для лк учителя
  {
    path: 'lk-admin',
    canActivate: [AuthGuard],
    component: PrivateOfficePageWeb,
    data: { roles: [Role.AdministratorTeacher] }
  },
];

const registrationCompanyFormRoutes: Routes = [
  { path: '', redirectTo: '/registration/company/step1', pathMatch: 'full',},
  { path: 'step1', component: Step1RegistrationCompanyFormComponent },
  { path: 'step2', component: Step2RegistrationCompanyFormComponent },
];

const registrationRoutes: Routes = [
  { path: 'teacher', component: RegistrationTeacherComponent },
  { path: 'student', component: RegistrationStudentComponent },
  { path: 'company', children: registrationCompanyFormRoutes},
  { path: '', redirectTo: '/**', pathMatch: "full"},
];

const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent, children: [
      {path: '', component: HomePageWeb},
      {path: 'about', component: AboutPageWeb},
      {path: 'tasks', component: TasksPage, children: tasksRoutes},

      {path: 'rating', component: RatingPageWeb},
      {path: 'FAQ', component: FAQPageWeb},
      // {path: 'lk', component: lkPage, children: lkRoutes},
      {
        path: 'lk-student',
        canActivate: [AuthGuard],
        component: PrivateOfficePageWeb,
        data: { roles: [Role.Student] }
      }, // использует guard
      {
        path: 'lk-teacher',
        canActivate: [AuthGuard],
        component: PrivateOfficePageWeb,
        data: { roles: [Role.Teacher] }
      }, //Использует guard для лк учителя
      {
        path: 'lk-admin',
        canActivate: [AuthGuard],
        component: PrivateOfficePageWeb,
        data: { roles: [Role.AdministratorTeacher] }
      }, // использует guard
      // {path: 'company', children: registrationCompanyFormRoutes},
      {path: 'registration', component: RegistrationPageWeb, children: registrationRoutes},
      {path: 'authorization', component: LoginPageWeb},
    ]
  },
  {path: '**', component: PageNotFoundPageWeb}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
