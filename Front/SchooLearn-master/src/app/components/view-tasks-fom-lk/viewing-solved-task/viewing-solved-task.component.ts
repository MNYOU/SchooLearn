import {Component, Input} from '@angular/core';
import { ISolvedTask} from "../../../modules/info-lk/info.interfases";

@Component({
  selector: 'app-viewing-solved-task',
  templateUrl: './viewing-solved-task.component.html',
  styleUrls: ['./viewing-solved-task.component.scss']
})
export class ViewingSolvedTaskComponent {
  @Input() solvedTask?: ISolvedTask;

}
