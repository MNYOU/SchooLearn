import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-change-nickname',
  templateUrl: './change-nickname.component.html',
  styleUrls: ['./change-nickname.component.scss']
})
export class ChangeNicknameComponent {
  @Output() onChanged = new EventEmitter<boolean>();
  change() {
    this.onChanged.emit();
  }
}
