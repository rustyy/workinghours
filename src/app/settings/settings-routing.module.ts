import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class SettingsRoutingModule {}
