import { Component, Input, OnInit } from '@angular/core';
import { ITimeRecord } from '../../shared/database/TimesheetDatabase';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-record-list-item',
  templateUrl: './record-list-item.component.html',
  styleUrls: ['./record-list-item.component.scss'],
})
export class RecordListItemComponent implements OnInit {
  @Input() item: ITimeRecord | undefined;
  start = '';
  isTranslatableType = false;
  typeTranslationKey = '';
  typeModifier = '';

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    if (this.item) {
      const { type } = this.item;

      this.start = this.datePipe.transform(this.item.start, 'EEEEEE') || '';
      this.isTranslatableType = type > 0;
      this.typeModifier = `item__type--${type}`;
      this.typeTranslationKey = `TYPES.type${type}`;
    }
  }
}
