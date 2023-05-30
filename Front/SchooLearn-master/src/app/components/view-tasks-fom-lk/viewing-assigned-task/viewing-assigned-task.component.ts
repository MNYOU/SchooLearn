import {Component, Input} from '@angular/core';
import {IAppTask} from "../../../modules/info-lk/info.interfases";

@Component({
  selector: 'app-viewing-assigned-task',
  templateUrl: './viewing-assigned-task.component.html',
  styleUrls: ['./viewing-assigned-task.component.scss']
})
export class ViewingAssignedTaskComponent {
  @Input() appTask?: IAppTask;

  onOpenAppTask() {

  }
}
