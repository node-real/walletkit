import { keyframes, style } from '@vanilla-extract/css';

const modalSlideInFrames = keyframes({
  '0%': {
    transform: 'translateY(40%)',
  },
  '100%': {
    transform: 'translateY(0%)',
  },
});

const modalSlideOutFrames = keyframes({
  '0%': {
    transform: 'translateY(0%)',
  },
  '100%': {
    transform: 'translateY(40%)',
  },
});

export const clsModalSlideIn = style({
  animation: `${modalSlideInFrames} 0.2s forwards ease-out`,
  transformOrigin: 'bottom center',
});

export const clsModalSlideOut = style({
  animation: `${modalSlideOutFrames} 0.2s forwards ease-out`,
  transformOrigin: 'bottom center',
});
