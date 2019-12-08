import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-week-indicator',
  templateUrl: './week-indicator.component.html',
  styleUrls: ['./week-indicator.component.scss']
})
export class WeekIndicatorComponent {
  @Input() year: number;
  @Input() week: number;
  @Input() from: string;
  @Input() to: string;

  constructor() {}
}
