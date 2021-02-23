import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'record', loadChildren: () => import('./record/record.module').then((m) => m.RecordModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule) },
  // Redirect all routes to / that are not defined by feature.
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
