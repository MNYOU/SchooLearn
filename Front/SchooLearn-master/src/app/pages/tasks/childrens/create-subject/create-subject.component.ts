import { Component } from '@angular/core';
import {Location} from "@angular/common";
import {InfoLkFromTeacherService} from "../../../../modules/info-lk/info-lk-from-teacher.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent {
  constructor(private location: Location,
              private infoLkFromTeacherService: InfoLkFromTeacherService,
              private router: Router) { }
  currentSubjectName: string = "";
  backPhase() {
    this.location.back();
  }

  createSubject() {
    this.infoLkFromTeacherService.createSubject(this.currentSubjectName);
    this.router.navigate(["tasks/create"], { queryParams: { newSubject: "true"}});
  }
}
