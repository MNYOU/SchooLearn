// import { Component, ElementRef, OnInit } from "@angular/core";
//
// @Component({
//   template: ``,
//   styles: [
//     `
//       :host {
//         display: block;
//         width: var(--skeleton-rect-width);
//         height: var(--skeleton-rect-height);
//         border-radius: var(--skeleton-rect-radius);
//         background: rgb(239, 241, 246) no-repeat;
//         margin-bottom: 20px;
//       }
//     `
//   ],
// })
// export class RectangleComponent implements OnInit{
//   public width: string;
//   public height: string;
//   public className: string;
//   public radius: string;
//
//   constructor(private host: ElementRef<HTMLElement>) { }
//
//   public ngOnInit() {
//     const host: HTMLElement = this.host.nativeElement;
//
//     if (this.className){
//       host.classList.add(this.className);
//     }
//
//     host.style.setProperty('--skeleton-rect-width', this.width ?? '100%');
//     host.style.setProperty('--skeleton-rect-height', this.height ?? '100%')
//     host.style.setProperty('--skeleton-rect-radius', this.radius ?? '100%')
//   }
// }
