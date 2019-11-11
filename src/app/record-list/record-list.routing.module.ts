import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecordListComponent } from './record-list/record-list.component';

const routes = [
  {
    path: '',
    component: RecordListComponent
  },
  {
    path: 'list/:year/:week',
    component: RecordListComponent,
    data: { animation: 'listPage' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class RecordListRoutingModule {}
