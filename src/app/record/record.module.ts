import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordDetailComponent } from './record-detail.component';
import { RecordRoutingModule } from './record-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PageModule } from '../shared/page/page.module';
import { InputModule } from '../shared/input/input.module';
import { SvgModule } from '../shared/svg/svg.module';
import { ButtonModule } from '../shared/button/button.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { ValidatorService } from './validator.service';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from '../shared/modal/modal.module';

@NgModule({
  declarations: [RecordDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecordRoutingModule,
    PageModule,
    InputModule,
    SvgModule,
    ButtonModule,
    DirectivesModule,
    RecordRoutingModule,
    TranslateModule,
    ModalModule
  ],
  exports: [RecordDetailComponent, RecordRoutingModule],
  providers: [ValidatorService]
})
export class RecordModule {}
