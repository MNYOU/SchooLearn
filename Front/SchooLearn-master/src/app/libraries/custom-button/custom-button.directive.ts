import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input, OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {ButtonBorder, ButtonColorVariants, ButtonPadding, ButtonRadius} from "./custom-button.interface";

@Directive({
  selector: '[custom-button]',
})
export class CustomButtonDirective implements OnInit{
  @Input("color") public variant: ButtonColorVariants = "white";
  @Input("radius") public radius: ButtonRadius = "medium";
  @Input("border") public withBorder: ButtonBorder | null = null;
  @Input("padding") public padding: ButtonPadding = "medium-2";
  constructor(
    private elRef: ElementRef<HTMLElement>,
    private renderer:Renderer2
  ) { }

  ngOnInit() {
    this.renderer.addClass(this.elRef.nativeElement, "custom-button");
    this.renderer.addClass(this.elRef.nativeElement, this.radius + "_radius")
    this.renderer.addClass(this.elRef.nativeElement, this.variant)
    this.renderer.addClass(this.elRef.nativeElement, this.padding + "_padding")
    if (this.withBorder)
      this.renderer.addClass(this.elRef.nativeElement, "border")
  }
}
