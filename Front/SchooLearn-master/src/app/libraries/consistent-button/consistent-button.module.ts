import { NgModule } from '@angular/core';
import {PrimaryButtonDirective} from "./consistent-button.directives/primary-button.directive";
import {SecondaryButtonDirective} from "./consistent-button.directives/secondary-button.directive";


@NgModule({
  declarations: [PrimaryButtonDirective, SecondaryButtonDirective],
  imports: [],
  exports: [PrimaryButtonDirective, SecondaryButtonDirective],
})
export class ButtonModule {}
