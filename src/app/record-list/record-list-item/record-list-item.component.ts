import { Component, Input, OnInit } from '@angular/core';
import { TimeRecord } from '../../../types/TimeRecord';

@Component({
  selector: 'app-record-list-item',
  templateUrl: './record-list-item.component.html',
  styleUrls: ['./record-list-item.component.scss']
})
export class RecordListItemComponent implements OnInit {
  @Input() item: TimeRecord;

  isTranslatableType: boolean;
  typeTranslationKey: string;
  typeModifier: string;

  ngOnInit(): void {
    const { type } = this.item;

    this.isTranslatableType = type > 0;
    this.typeModifier = `item__type--${type}`;
    this.typeTranslationKey = `TYPES.type${type}`;
  }
}
