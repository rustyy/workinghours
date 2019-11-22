import { animate, group, query, style, transition, trigger } from '@angular/animations';

const MESSAGE_SELECTOR = '.confirmation__message';

const confirmIn = transition(':enter', [
  style({ opacity: 0 }),
  query(MESSAGE_SELECTOR, [style({ transform: 'translateY(100px)' })]),
  group([
    animate('200ms', style({ opacity: 1 })),
    query(MESSAGE_SELECTOR, [
      animate('200ms cubic-bezier(0.55, 0.31, 0.15, 0.93)', style({ transform: 'translateY(0)' }))
    ])
  ])
]);

const confirmOut = transition(':leave', [
  style({ opacity: 1 }),
  query(MESSAGE_SELECTOR, [style({ transform: 'translateY(0)' })]),
  group([
    animate('200ms', style({ opacity: 0 })),
    query(MESSAGE_SELECTOR, [
      animate('200ms cubic-bezier(0.55, 0.31, 0.15, 0.93)', style({ transform: 'translateY(-100px)' }))
    ])
  ])
]);

export const confirmAnimation = trigger('confirmTrigger', [confirmIn, confirmOut]);
