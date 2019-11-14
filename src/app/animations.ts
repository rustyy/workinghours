import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> closable', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      })
    ]),
    query(':enter', [style({ transform: 'translateX(100vw)', opacity: 0 })]),
    query(':leave', [style({ transform: 'translateX(0)', opacity: 1 })]),

    group([
      query(':enter', [animate('200ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))]),
      query(':leave', [animate('200ms ease-in-out', style({ transform: 'translateX(-100vw)', opacity: 0 }))])
    ])
  ])
]);
