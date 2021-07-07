import {
  AnimationTriggerMetadata,
  trigger,
  transition,
  style,
  animate,
  stagger,
  query,
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

export function fadeMenuAndSlip(): AnimationTriggerMetadata {
  return trigger('fadeMenuAndSlip', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('200ms', style({ opacity: 1, display: 'block' })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('200ms', style({ opacity: 0, display: 'none' })),
    ]),
  ]);
}
export function listAnimation(): AnimationTriggerMetadata {
  return trigger('listAnimation', [
    transition('* <=> *', [
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          stagger('60ms', animate('600ms ease-out', style({ opacity: 1 }))),
        ],
        { optional: true }
      ),
      query(':leave', animate('200ms', style({ opacity: 0 })), {
        optional: true,
      }),
    ]),
  ]);
}
