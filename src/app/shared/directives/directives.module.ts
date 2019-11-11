import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexContainerDirective } from './flex-container/flex-container.directive';

@NgModule({
  declarations: [FlexContainerDirective],
  imports: [CommonModule],
  exports: [FlexContainerDirective]
})
export class DirectivesModule {}
