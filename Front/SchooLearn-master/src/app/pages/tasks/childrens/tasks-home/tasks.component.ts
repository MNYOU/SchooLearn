import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tasks-home',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksPageWeb {
  constructor(private _router: Router) {
  }
  openSubjects(): void {
    this._router.navigate(['/tasks/subjects']).then();
  }
}
