import {Component, Input} from '@angular/core';
import {IAppTask} from "../../../modules/info-lk/info.interfases";

@Component({
  selector: 'app-view-assigned-task-for-teacher',
  templateUrl: './view-assigned-task-for-teacher.component.html',
  styleUrls: ['./view-assigned-task-for-teacher.component.scss']
})
export class ViewAssignedTaskForTeacherComponent {
  @Input() task?: IAppTask;

  onOpenAppTask() {

  }
}
