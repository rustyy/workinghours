import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-record-list-item',
  templateUrl: './record-list-item.component.html',
  styleUrls: ['./record-list-item.component.scss']
})
export class RecordListItemComponent {
  @Input() item: TimeRecord;

  constructor() {}
}
