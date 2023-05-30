import { Component } from '@angular/core';
import {InfoLkFromTeacherService} from "../../../modules/info-lk/info-lk-from-teacher.service";
import {Router} from "@angular/router";
import {IInstitution} from "../../../modules/auth/interfaces/auth/auth-responce-user.interface";
import {Observable} from "rxjs";
import {IGroup} from "../../../modules/info-lk/info.interfases";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private infoLkFromTeacherService: InfoLkFromTeacherService, private router: Router) { }
  nickName?: string;
  organization?: IInstitution;
  groups$?: Observable<IGroup[]>;
  currentGroup?: number;
  id: number = 0;
  key$?: Observable<{code: string}>;
  nameTeacher$?: Observable<string>;

  ngOnInit() {
    let user = this.infoLkFromTeacherService.getInfoUser(true);
    this.nickName = user.nickName;
    this.organization = user.institution.name;
    this.key$ = this.infoLkFromTeacherService.getCodeFromAdmin();
  }

  onGetNewCodeGroup() {
    this.infoLkFromTeacherService.getNewCodeFromAdmin().subscribe(
      (data) => {
        console.log(data)
        this.key$ = this.infoLkFromTeacherService.getCodeFromAdmin();
      }
    )
  }
}
