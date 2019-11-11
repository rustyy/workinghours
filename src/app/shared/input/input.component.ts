import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input()
  parentForm;
  @Input()
  type;
  @Input()
  readonly = false;
  @Input()
  id;
  @Input()
  label;
  @Input()
  options;

  constructor() {}

  ngOnInit() {}
}
