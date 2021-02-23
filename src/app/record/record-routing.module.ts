import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecordDetailComponent } from './record-detail.component';

const routes = [
  {
    path: '',
    redirectTo: 'add',
  },
  {
    path: 'add',
    component: RecordDetailComponent,
    data: { animation: 'closable' },
  },
  {
    path: ':id',
    component: RecordDetailComponent,
    data: { animation: 'closable' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class RecordRoutingModule {}
