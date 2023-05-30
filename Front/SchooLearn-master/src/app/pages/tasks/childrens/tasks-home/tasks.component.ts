import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {InfoLkFromTeacherService} from "../../../../modules/info-lk/info-lk-from-teacher.service";
import {Observable} from "rxjs";
import {ISubject} from "../../../../modules/info-lk/info.interfases";

@Component({
  selector: 'app-tasks-home',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksPageWeb {
  constructor(private formBuilder: FormBuilder,
              private infoLkFromTeacherService: InfoLkFromTeacherService,
              private route: ActivatedRoute,
              private router: Router) { }
  subjects$?: Observable<ISubject[]>

  ngOnInit() {
    this.subjects$ = this.infoLkFromTeacherService.getSubjects();
  }

  clickSubject(subject: ISubject) {

  }
}
