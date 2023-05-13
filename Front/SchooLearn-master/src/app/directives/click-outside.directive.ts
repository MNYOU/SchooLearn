import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef) {}

  @Output() clickOpen = new EventEmitter<void>();
  @Output() clickClose = new EventEmitter<void>();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (clickedInside) {
      this.clickOpen.emit();
    } else {
      this.clickClose.emit();
    }
  }
}
