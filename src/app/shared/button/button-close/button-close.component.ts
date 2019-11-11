import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-button-close',
  templateUrl: './button-close.component.html',
  styleUrls: ['./button-close.component.scss']
})
export class ButtonCloseComponent {
  constructor(private location: Location) {}

  onClick() {
    this.location.back();
  }
}
