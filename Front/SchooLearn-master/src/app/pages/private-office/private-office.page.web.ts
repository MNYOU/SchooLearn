import { Component } from "@angular/core";
import {AuthService} from "../../modules/auth/services/auth.service";
import {IAuthResponseUserInterface} from "../../modules/auth/interfaces/auth/auth-responce-user.interface";
import {SubjectService} from "../../modules/tasks/services/subject.service";
import {ISubject} from "../../modules/tasks/interfaces/subject.interface";
import {Subscriber, Subscription} from "rxjs";
import {InfoService, ISubjectFromLK} from "../../modules/info.service";

@Component({
  selector: "private-office",
  templateUrl: "private-office.page.web.html",
  styleUrls: ["private-office.page.web.scss"]
})
export class PrivateOfficePageWeb{
  constructor(private infoService: InfoService, private subjectService: SubjectService) { }
  student: IAuthResponseUserInterface | undefined;
  subjects?: ISubject[];
  subjectsSubscription?: Subscription;
  subject: ISubjectFromLK | undefined;
  subjectSubscription?: Subscription;

  ngOnInit() {
    this.student = this.infoService.getInfoStudent();
    this.subjectsSubscription = this.subjectService.getSubjects().subscribe(
      (data) => {
        this.subjects = data;
        this.subjectSubscription = this.infoService.getInfoSubjectFromStudent(this.subjects[0].name).subscribe(
          dataSubject => {
            this.subject = dataSubject;
          }
        );
      }
    )
  }

  ngOnDestroy() {
    this.subjectsSubscription?.unsubscribe();
    this.subjectSubscription?.unsubscribe();
  }
}
