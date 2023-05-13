import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

import {Observable, switchMap} from "rxjs";
import {TasksService} from "../../../../../../modules/tasks/services/tasks.service";
import {ITask} from "../../../../../../modules/tasks/interfaces/task.itnerface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-task',
  templateUrl: './task.page.web.html',
  styleUrls: ['./task.page.web.scss']
})
export class TaskPageWeb implements OnInit {
  task$!: Observable<ITask>;
  private subject!: string | null;

  constructor(private _taskService: TasksService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.task$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.subject = params.get('subjectName');
        return this._taskService.getTask(this.subject);
      })
    );
  }

  // getTask(): void {
  //   this._taskService.getTask()
  //     .subscribe(subjects => this.subjects = subjects);
  // }
}
