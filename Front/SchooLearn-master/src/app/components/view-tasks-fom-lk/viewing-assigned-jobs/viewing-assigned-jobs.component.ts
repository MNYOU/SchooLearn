import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IAppTask} from "../../../modules/info-lk/info.interfases";
import {Observable} from "rxjs";
import {InfoService} from "../../../modules/info-lk/info.service";

@Component({
  selector: 'app-viewing-assigned-jobs',
  templateUrl: './viewing-assigned-jobs.component.html',
  styleUrls: ['./viewing-assigned-jobs.component.scss']
})
export class ViewingAssignedJobsComponent implements OnChanges {
  constructor(private infoService: InfoService) { }
  @Input() id!: number;
  appTasks$?: Observable<IAppTask[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue !== undefined) {
      this.appTasks$ = this.infoService.getAppTasks(changes['id'].currentValue, true);
    } else {
      console.log('Значение id не было передано в компоненту');
    }
  }
}
