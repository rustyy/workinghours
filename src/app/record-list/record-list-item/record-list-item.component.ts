import { Component, Input, OnInit } from '@angular/core';
import { TimeRecord } from '../../shared/database/TimesheetDatabase';

@Component({
  selector: 'app-record-list-item',
  templateUrl: './record-list-item.component.html',
  styleUrls: ['./record-list-item.component.scss'],
})
export class RecordListItemComponent implements OnInit {
  @Input() item: TimeRecord | undefined;

  isTranslatableType = false;
  typeTranslationKey = '';
  typeModifier = '';

  ngOnInit(): void {
    if (this.item) {
      const { type } = this.item;

      this.isTranslatableType = type > 0;
      this.typeModifier = `item__type--${type}`;
      this.typeTranslationKey = `TYPES.type${type}`;
    }
  }
}
