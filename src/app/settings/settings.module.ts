import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

import { PageModule } from '../shared/page/page.module';
import { ButtonModule } from '../shared/button/button.module';
import { InputModule } from '../shared/input/input.module';
import { SvgModule } from '../shared/svg/svg.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageModule,
    ButtonModule,
    SettingsRoutingModule,
    InputModule,
    SvgModule,
    TranslateModule
  ],
  exports: [SettingsComponent]
})
export class SettingsModule {}
