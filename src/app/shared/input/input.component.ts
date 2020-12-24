import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface SelectOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input()
  parentForm: FormGroup | undefined;
  @Input()
  type = 'text';
  @Input()
  readonly = false;
  @Input()
  id = '';
  @Input()
  label = '';
  @Input()
  options: Array<SelectOption> = [];
}
