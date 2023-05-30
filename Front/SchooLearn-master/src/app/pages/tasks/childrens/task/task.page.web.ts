import { Component, OnInit} from '@angular/core';

import {EMPTY, Observable, of, switchMap} from "rxjs";

import {ActivatedRoute, Router} from "@angular/router";
import {IAppTakFullInfo} from "../../../../modules/info-lk/info.interfases";
import {Location} from "@angular/common";
import {NewTaskService} from "../../../../modules/tasks/new-task.service";
import {catchError, tap} from "rxjs/operators";

@Component({
  selector: 'app-task.scss',
  templateUrl: './task.page.web.html',
  styleUrls: ['./task.page.web.scss']
})
export class TaskPageWeb implements OnInit {
  task$!: Observable<IAppTakFullInfo>;
  answer?: string;
  result?: boolean;
  constructor(private taskService: NewTaskService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.task$ = this.route.paramMap.pipe(
      switchMap(params => {
        let id: string | null = params.get('subjectId');
        if(id !== null) {
          return this.taskService.getFreeTask(parseInt(id)).pipe(
            catchError(() => {
              alert('Нет заданий по этому предмету');
              this.router.navigate(['/tasks']);
              return EMPTY;
            })
          );
        } else {
          return of();
        }
      })
    );
    this.task$.subscribe(
      data => console.log(data)
    )
  }

  endTask(task: IAppTakFullInfo) {
    console.log("false")

    if(this.answer) {
      this.taskService.checkAnswer(task.id, this.answer).subscribe(
        (response) => {
          this.result = true;
          console.log('Ответ сервера:', response);
        },
        (error) => {
          this.result = false;
          console.log("false")

          // если решение было неправильное
          // console.log('Ошибка:', error);
        }
      );
    }
  }

  calculateDifficulty(difficulty: string) {
    if(difficulty.toLowerCase() === "легкий")
      return 1;
    else if(difficulty.toLowerCase() === "средний") {
      return 2;
    }
    else if(difficulty.toLowerCase() === "сложный") {
      return 3;
    }
    return 0
  }

  backPhase() {
    this.location.back();
  }

  nextTask() {
    this.task$ = this.route.paramMap.pipe(
      switchMap(params => {
        let id: string | null =  params.get('subjectId')
        if(id !== null) {
          console.log("next");
          this.answer = undefined;
          this.result = undefined;
          return this.taskService.getFreeTask(parseInt(id));
        }
        else {
          return of()
        }
      })
    );
  }

  checkResult() {
    return this.result == null;
  }
}

