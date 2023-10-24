import { keyframes, style } from '@vanilla-extract/css';

const toastSlideInFrames = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(-24px) scale(0.85)',
    maxHeight: 0,
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
    maxHeight: 200,
  },
});

const toastSlideOutFrames = keyframes({
  '0%': {
    opacity: 1,
    transform: 'scale(1)',
    maxHeight: 200,
  },
  '50%': {
    opacity: 0,
    transform: 'scale(0.85)',
    maxHeight: 0,
  },
  '100%': {
    opacity: 0,
    transform: 'scale(0.85)',
    maxHeight: 0,
  },
});

export const toastSlideIn = style({
  animation: `${toastSlideInFrames} 0.4s forwards`,
  transformOrigin: '50% 50% 0px',
});

export const toastSlideOut = style({
  animation: `${toastSlideOutFrames} 0.4s forwards`,
  transformOrigin: '50% 50% 0px',
});
