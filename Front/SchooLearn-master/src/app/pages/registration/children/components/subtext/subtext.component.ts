import { Component } from '@angular/core';

@Component({
  selector: 'app-subtext',
  template:  `<div class="subtext-box">
                <p class="subtext-text">
                  <ng-content></ng-content>
                </p>
              </div>`,
  styleUrls: ['./subtext.component.scss']
})
export class SubtextComponent { }
