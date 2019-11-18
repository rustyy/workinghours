import { animation, query, style, stagger, animate } from '@angular/animations';
import { BEZIER } from './bezier';

export const listToList = animation([
  query(
    ':enter',
    [
      style({ opacity: 0, transform: 'translateY(50px)' }),
      stagger(60, [animate(BEZIER, style({ opacity: 1, transform: 'translateY(0)' }))])
    ],
    { optional: true }
  )
]);
