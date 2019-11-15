import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

const confirmIn = transition(':enter', [
  style({ opacity: 0 }),
  group([query('@confirmMessageTrigger', animateChild()), animate('200ms', style({ opacity: 1 }))])
]);

const confirmOut = transition(':leave', [
  style({ opacity: 1 }),
  group([query('@confirmMessageTrigger', animateChild()), animate('200ms', style({ opacity: 0 }))])
]);

export const confirmAnimation = trigger('confirmTrigger', [confirmIn, confirmOut]);

const confirmMessageIn = transition('* => in', [
  style({ transform: 'translateY(100px)' }),
  animate('200ms cubic-bezier(0.55, 0.31, 0.15, 0.93)', style({ transform: 'translateY(0)' }))
]);

const confirmMessageOut = transition('in => *', [
  style({ transform: 'translateY(0)' }),
  animate('200ms cubic-bezier(0.55, 0.31, 0.15, 0.93)', style({ transform: 'translateY(-100px)' }))
]);

export const confirmMessageAnimation = trigger('confirmMessageTrigger', [confirmMessageIn, confirmMessageOut]);
