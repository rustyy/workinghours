import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-week-indicator',
  templateUrl: './week-indicator.component.html',
  styleUrls: ['./week-indicator.component.scss'],
})
export class WeekIndicatorComponent {
  // W52 2020 - 12/21 - 12/27
  @Input() year = 2020;
  @Input() week = 52;
  @Input() from = 1608505200000;
  @Input() to = 1609109999999;

  constructor() {}
}
