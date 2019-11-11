import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecordDetailComponent } from './record-detail.component';

const routes = [
  {
    path: 'record/add',
    component: RecordDetailComponent
  },
  {
    path: 'record/:id',
    component: RecordDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class RecordRoutingModule {}
