// import {
//   ComponentRef,
//   Directive,
//   Input,
//   SimpleChanges,
//   TemplateRef,
//   ViewContainerRef
// } from "@angular/core";
// import { RectangleComponent } from "./rectangle-component/rectangle.component";
//
// @Directive({
//   selector: '[skeleton]'
// })
// export class SkeletonDirective {
//   @Input('skeleton')
//   public isLoading: boolean = false;
//   @Input('skeletonWidth')
//   public width: string;
//   @Input('skeletonRepeat')
//   public repeat: number = 1;
//   @Input('skeletonHeight')
//   public height: string;
//   @Input('skeletonClassName')
//   public className: string;
//   @Input('skeletonRadius')
//   public radius: string;
//
//   constructor(private _tpl: TemplateRef<any>, private _vcr: ViewContainerRef) { }
//
//   public ngOnChanges(changes: SimpleChanges) {
//     if (changes['isLoading']?.currentValue) {
//       Array.from({ length: this.repeat }).forEach(() => {
//         const ref: ComponentRef<RectangleComponent> =
//           this._vcr.createComponent(RectangleComponent)
//
//         Object.assign(ref.instance, {
//           width: this.width,
//           height: this.height,
//           className: this.className,
//           radius: this.radius,
//         });
//       });
//     } else {
//       this._vcr.clear();
//       this._vcr.createEmbeddedView(this._tpl)
//     }
//   }
// }
