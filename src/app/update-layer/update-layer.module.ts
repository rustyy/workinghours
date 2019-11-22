import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateLayerComponent } from './update-layer.component';
import { ModalModule } from '../shared/modal/modal.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UpdateLayerComponent],
  imports: [CommonModule, ModalModule, TranslateModule],
  exports: [UpdateLayerComponent]
})
export class UpdateLayerModule {}
