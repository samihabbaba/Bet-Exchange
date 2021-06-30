import {
  AnimationTriggerMetadata,
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

export function fadeMenuDropdown(): AnimationTriggerMetadata {
  return trigger('fadeMenuDropdown', [
    transition(':enter', [
      style({ opacity: 0.5 }),
      animate(150, style({ opacity: 1 })),
    ]),
    transition(':leave', [animate(0, style({ opacity: 0 }))]),
  ]);
}
