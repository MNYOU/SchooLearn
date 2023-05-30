import {Component, Input} from '@angular/core';
import {Observable, of, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {InfoService} from "../../../../modules/info-lk/info.service";
import {ISolvedTaskFullInfo} from "../../../../modules/info-lk/info.interfases";
import { Location } from '@angular/common';
import {Role} from "../../../../modules/auth/enums/role.enum";
import {InfoLkFromTeacherService} from "../../../../modules/info-lk/info-lk-from-teacher.service";
@Component({
  selector: 'app-view-solved-task-page',
  templateUrl: './view-solved-task-page.component.html',
  styleUrls: ['./view-solved-task-page.component.scss']
})
export class ViewSolvedTaskPageComponent {
  task$!: Observable<any>;
  role?: string;
  constructor(private infoService: InfoService,
              private infoServiceFromInfo: InfoLkFromTeacherService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params1) => {
      this.task$ = this.route.paramMap.pipe(
        switchMap(params => {
          let id: string | null =  params.get('taskId')
          if(id !== null) {
            if (params1['role'] === "teacher") {
              this.role = "teacher";
              return this.infoServiceFromInfo.getSolvedTasksInfoFromTeacherFull(parseInt(id));
            } else {
              return this.infoService.getSolvedTaskFullInfo(parseInt(id), true);
            }
          }
          else {
            return of()
          }
        })
      );
    });

    this.task$.subscribe(
      (data) => console.log(data)
    )
  }

  endTask() {
    this.infoService.sendReply();
  }

  backPhase() {
    this.location.back();
  }
  calculateDifficulty(difficulty: string) {
    console.log("difficulty")

    console.log(difficulty)
    if(difficulty === "Легкий")
      return 1;
    else if(difficulty === "Средний") {
      return 2;
    }
    else if(difficulty === "Сложный") {
      return 3;
    }
    return 0
  }
}
