import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgComponent } from './svg/svg.component';
import { SvgDefsComponent } from './svg-defs/svg-defs.component';

@NgModule({
  declarations: [SvgDefsComponent, SvgComponent],
  imports: [CommonModule],
  exports: [SvgDefsComponent, SvgComponent]
})
export class SvgModule {}
