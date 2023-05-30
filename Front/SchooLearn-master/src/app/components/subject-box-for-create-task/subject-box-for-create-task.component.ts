import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-subject-box-for-create-task',
  templateUrl: 'subject-box-for-create-task.component.html',
  styleUrls: ['subject-box-for-create-task.component.scss']
})
export class SubjectBoxForCreateTaskComponent {
  @Input() subjectName!: string;
  @Output() emitSubjectClick: EventEmitter<string> = new EventEmitter<string>();

  onClick() {
    this.emitSubjectClick.emit(this.subjectName);
  }
}
