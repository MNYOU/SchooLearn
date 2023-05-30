import {Component, Input, SimpleChanges} from '@angular/core';
import {InfoService} from "../../../modules/info-lk/info.service";
import {Observable} from "rxjs";
import {IAppTask} from "../../../modules/info-lk/info.interfases";
import {InfoLkFromTeacherService} from "../../../modules/info-lk/info-lk-from-teacher.service";

@Component({
  selector: 'app-view-assigned-tasks-for-teacher',
  templateUrl: './view-assigned-tasks-for-teacher.component.html',
  styleUrls: ['./view-assigned-tasks-for-teacher.component.scss']
})
export class ViewAssignedTasksForTeacherComponent {
  constructor(private infoService: InfoLkFromTeacherService) { }
  @Input() id!: number;
  appTasks$?: Observable<IAppTask[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue !== undefined) {
      this.appTasks$ = this.infoService.getSolvedTasksInfoFromTeacher(changes['id'].currentValue);
    } else {
      console.log('Значение id не было передано в компоненту');
    }
  }
}
