import {Component, EventEmitter, HostListener, Output, Renderer2} from '@angular/core';

@Component({
  selector: 'app-information-role-buttons',
  templateUrl: './information-role-buttons.component.html',
  styleUrls: ['./information-role-buttons.component.scss']
})
export class InformationRoleButtonsComponent {
  @Output() studentInfo = new EventEmitter<boolean>();
  isGradientChanged = false;
  constructor(private renderer: Renderer2) { }
  toggleGradient() {
    this.isGradientChanged = !this.isGradientChanged;
    this.studentInfo.emit(this.isGradientChanged);
    const btnRight = document.querySelector('.base-info__buttons-box') as HTMLElement;

    if (this.isGradientChanged) {
      this.renderer.addClass(btnRight, 'changed');
    } else {
      this.renderer.removeClass(btnRight, 'changed');
    }
  }

  @HostListener('document:keydown.escape')
  resetGradient() {
    this.isGradientChanged = false;
    const btnRight = document.querySelector('.base-info__buttons-box') as HTMLElement;
    this.renderer.removeClass(btnRight, 'changed');
  }
}
