import { Component } from '@angular/core';
import {Observable, of, switchMap} from "rxjs";
import {IAppTakFullInfo, ISolvedTaskFullInfo} from "../../../../modules/info-lk/info.interfases";
import {InfoService} from "../../../../modules/info-lk/info.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {NewTaskService} from "../../../../modules/tasks/new-task.service";

@Component({
  selector: 'app-view-assigned-task-page',
  templateUrl: './view-assigned-task-page.component.html',
  styleUrls: ['./view-assigned-task-page.component.scss']
})
export class ViewAssignedTaskPageComponent {
  task$!: Observable<IAppTakFullInfo>;
  result?: boolean;
  answer?: string;

  constructor(private taskService: NewTaskService,
              private infoService: InfoService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.task$ = this.route.paramMap.pipe(
      switchMap(params => {
        let id: string | null =  params.get('taskId')
        if(id !== null)
          return this.infoService.getAppTaskFullInfo(parseInt(id), true);
        else {
          return of()
        }
      })
    );
  }

  backPhase() {
    this.location.back();
  }

  calculateDifficulty(difficulty: string) {
    if(difficulty === "легкий")
      return 1;
    else if(difficulty === "средний") {
      return 2;
    }
    else if(difficulty === "сложный") {
      return 3;
    }
    return 0
  }

  checkResult() {
    return this.result == null;
  }

  endTask(task: IAppTakFullInfo) {
    this.task$.subscribe(
      (data) => console.log(data)
    )
    if(this.answer) {
      this.taskService.checkAnswer(task.id, this.answer).subscribe(
        (response) => {
          this.result = true;
          console.log('Ответ сервера:', response);
        },
        (error) => {
          this.result = false;

          // если решение было неправильное
          // console.log('Ошибка:', error);
        }
      );
    }
  }

}
