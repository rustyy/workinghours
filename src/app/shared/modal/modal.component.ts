import { Component, Input, OnInit } from '@angular/core';
import { confirmAnimation } from './animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [confirmAnimation]
})
export class ModalComponent implements OnInit {
  @Input()
  visible = false;

  constructor() {}

  ngOnInit() {}
}
