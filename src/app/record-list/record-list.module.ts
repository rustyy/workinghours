import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RecordListComponent } from './record-list/record-list.component';
import { RecordListItemComponent } from './record-list-item/record-list-item.component';
import { WeekIndicatorComponent } from './week-indicator/week-indicator.component';
import { RecordListRoutingModule } from './record-list.routing.module';
import { SvgModule } from '../shared/svg/svg.module';
import { ButtonModule } from '../shared/button/button.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../shared/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { PageModule } from '../shared/page/page.module';

@NgModule({
  declarations: [RecordListComponent, RecordListItemComponent, WeekIndicatorComponent],
  imports: [CommonModule, SvgModule, ButtonModule, RouterModule, PipesModule, TranslateModule, PageModule],
  exports: [RecordListComponent, RecordListRoutingModule],
  providers: [DatePipe],
})
export class RecordListModule {}
