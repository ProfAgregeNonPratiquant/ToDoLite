import { animate, state, style, transition, trigger } from '@angular/animations';

export const openClose = trigger('openclose', [
  state(
    'open', style({
  })),
  state('close', style({
    height: '0px'
  })),
  transition('close=>open', [
    animate('0.7s ease-out'),

  ]),
  transition('open=>close', [
    animate('0.7s ease-in')
  ])
])

export const toggle= trigger(
  'toggle',[  
    state(
      'face',
      style(
        {
          //transform: 'rotateX(0)'
        }
      )
    ),
    state(
      'tranche',
      style(
        {
          transform: 'rotateX(90deg)'
        }
      )
    ),
    transition(
      'face<=>tranche',[
        animate(
          '0.5s'
        )
      ]
    )
  ]
)
