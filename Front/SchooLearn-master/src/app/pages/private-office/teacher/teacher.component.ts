import {Component, OnDestroy} from '@angular/core';
import {InfoService} from "../../../modules/info-lk/info.service";
import {IInstitution} from "../../../modules/auth/interfaces/auth/auth-responce-user.interface";
import {Observable, Subscription} from "rxjs";
import {IGroup} from "../../../modules/info-lk/info.interfases";
import {applicationStudent, InfoLkFromTeacherService} from "../../../modules/info-lk/info-lk-from-teacher.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnDestroy{
  constructor(private infoLkFromTeacherService: InfoLkFromTeacherService, private router: Router) { }
  nickName?: string;
  organization?: IInstitution;
  groups$?: Observable<IGroup[]>;
  currentGroup?: number;
  currentSubject?: number;
  groupsSubscriptions?: Subscription;
  addedStudents?: applicationStudent[];
  addedStudentsSubscription?: Subscription;
  id: number = 0;
  key$?: Observable<{code: string}>;
  nameTeacher$?: Observable<string>;
  isApplication: boolean = false;
  students$?: Observable<applicationStudent[]>;
  applicationSubscription?: Subscription;

  currentPage: number = 1;
  productsPerPage = 5;


  ngOnInit() {
    let user = this.infoLkFromTeacherService.getInfoUser(true);
    this.nickName = user.nickName;
    this.organization = user.institution.name;
    let id = sessionStorage.getItem("id-teacher-group");
    if(id) {
      this.id = JSON.parse(id);
    }

    let idSubject = sessionStorage.getItem("id-student-subject");
    if(idSubject) {
      this.groups$ = this.infoLkFromTeacherService.getGroups(JSON.parse(idSubject), true);
    }
    this.onFindGroup()
  }

  onFindGroup() {
    sessionStorage.setItem("id-teacher-group", JSON.stringify(this.id));
    if (this.id) {
      this.key$ = this.infoLkFromTeacherService.getCode(this.id , true);
      this.addedStudentsSubscription = this.infoLkFromTeacherService.getConnectedStudents(this.id).subscribe(
        (data) => {
          console.log(data)
          this.addedStudents = data;
        }
      )
    }
  }

  onGetNewCodeGroup() {
    this.infoLkFromTeacherService.getNewCode(this.id).subscribe(
      (data) => {
        this.key$ = this.infoLkFromTeacherService.getCode(this.id);
      }
    )
  }

  getGroupsSubject(id: number) {
    this.currentSubject = id;
    this.groups$ = this.infoLkFromTeacherService.getGroups(id, true);
    this.groupsSubscriptions = this.groups$.subscribe(
      (data) => {
        const ids: number[] = data.map(obj => obj.id);
        if(!ids.includes(this.id)){
          this.id = 0;
          this.key$ = undefined;
          sessionStorage.setItem("id-teacher-group", JSON.stringify(this.id));
          this.students$ = undefined;
          this.addedStudents = undefined;
        }
      }
    );
  }

  qwe() {
    this.router.navigate(["tasks/create/subjects"]);
  }

  // applications(event: boolean) {
  //   this.isApplication = event;
  //
  // }

  onApplication() {
    this.isApplication = !this.isApplication;
    if(this.isApplication) {
      this.students$ = this.infoLkFromTeacherService.getApplicationStudents(this.id);
    }
  }

  add(student: applicationStudent, decision: boolean) {
    this.applicationSubscription = this.infoLkFromTeacherService.putConnectedStudentsInGroup(this.id, student.id, decision).subscribe();
    this.students$ = this.infoLkFromTeacherService.getApplicationStudents(this.id);
  }

  ngOnDestroy() {
    this.addedStudentsSubscription?.unsubscribe();
    this.groupsSubscriptions?.unsubscribe();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
