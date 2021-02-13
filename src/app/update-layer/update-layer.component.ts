import { Component } from '@angular/core';
import { updateLayer } from './animations';

@Component({
  selector: 'app-update-layer',
  templateUrl: './update-layer.component.html',
  styleUrls: ['./update-layer.component.scss'],
  animations: [updateLayer],
})
export class UpdateLayerComponent {
  installUpdateClick() {
    window.location.reload();
  }
}
