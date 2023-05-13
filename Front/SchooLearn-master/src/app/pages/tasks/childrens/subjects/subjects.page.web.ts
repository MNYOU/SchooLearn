import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../../../../modules/tasks/services/subject.service";
import {ISubject} from "../../../../modules/tasks/interfaces/subject.interface";
import {Observable, switchMap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.web.html',
  styleUrls: ['./subjects.page.web.scss']
})
export class SubjectsPageWeb implements OnInit{
  subjects$: Observable<ISubject[]> = new Observable<ISubject[]>();

  constructor(private _subjectService: SubjectService, private _route: Router) { }
  ngOnInit(): void {
    this.subjects$ = this._subjectService.getSubjects();
  }
  subject!: string;

  goToTaskPage(subject: any) {
    this.subject = subject.name;
    this._route.navigate([`/tasks/subjects/${this.subject}`]).then();
  }
}
