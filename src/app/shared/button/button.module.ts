import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { ButtonCloseComponent } from './button-close/button-close.component';
import { SvgModule } from '../svg/svg.module';

@NgModule({
  declarations: [ButtonComponent, ButtonCloseComponent],
  imports: [CommonModule, SvgModule],
  exports: [ButtonComponent, ButtonCloseComponent]
})
export class ButtonModule {}
