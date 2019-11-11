import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Redirect all routes to / that are not defined by feature.
const routes: Routes = [{ path: '**', redirectTo: '/', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
