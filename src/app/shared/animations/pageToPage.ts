import { animation, style, query, group, animate } from '@angular/animations';
import { BEZIER } from './bezier';

export const pageToPage = animation([
  style({ position: 'relative' }),
  query(
    ':enter, :leave',
    [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
      }),
    ],
    { optional: true }
  ),
  query(':enter', [style({ transform: 'translateX(100vw)', opacity: 0 })]),
  query(':leave', [style({ transform: 'translateX(0)', opacity: 1 })], { optional: true }),

  group([
    query(':enter', [animate(BEZIER, style({ transform: 'translateX(0)', opacity: 1 }))]),
    query(':leave', [animate(BEZIER, style({ transform: 'translateX(-100vw)', opacity: 0 }))], { optional: true }),
  ]),
]);
