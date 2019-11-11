import { animate, style, transition, trigger } from '@angular/animations';

const layerIn = transition(':enter', [
  style({ transform: 'translateY(-100%)' }),
  animate('160ms', style({ transform: 'translateY(0)' }))
]);

const layerOut = transition(':leave', [
  style({ transform: 'translateY(0)' }),
  animate('160ms', style({ transform: 'translateY(-100%)' }))
]);

export const updateLayer = trigger('updateLayer', [layerIn, layerOut]);
