import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinutesToHoursPipe } from './minutes-to-hours.pipe';

@NgModule({
  declarations: [MinutesToHoursPipe],
  imports: [CommonModule],
  exports: [MinutesToHoursPipe]
})
export class PipesModule {}
