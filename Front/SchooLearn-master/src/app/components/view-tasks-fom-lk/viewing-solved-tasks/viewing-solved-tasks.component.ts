import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {InfoService} from "../../../modules/info-lk/info.service";
import {Observable, Subscriber, Subscription} from "rxjs";
import { ISolvedTask} from "../../../modules/info-lk/info.interfases";

@Component({
  selector: 'app-viewing-solved-tasks',
  templateUrl: './viewing-solved-tasks.component.html',
  styleUrls: ['./viewing-solved-tasks.component.scss']
})
export class ViewingSolvedTasksComponent implements OnChanges{
  constructor(private infoService: InfoService) { }
  @Input() id!: number;
  @Output() subjectsCount = new EventEmitter<number>();
  solvedTasksSubscription?: Subscription;
  solvedTasks$?: Observable<ISolvedTask[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue !== undefined) {
      this.solvedTasks$ = this.infoService.getSolvedTasksInfo( parseInt(changes['id'].currentValue), true);
      this.solvedTasksSubscription = this.solvedTasks$.subscribe(
        (data) => {
          this.subjectsCount.emit(data.length);
        }
      )
    } else {
      console.log('Значение id не было передано в компоненту');
    }
  }
}
