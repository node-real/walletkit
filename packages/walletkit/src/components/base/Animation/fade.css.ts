import { keyframes, style } from '@vanilla-extract/css';

const fadeInFrames = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const fadeOutFrames = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

export const fadeIn = style({
  animation: `${fadeInFrames} 0.2s forwards`,
});

export const fadeOut = style({
  animation: `${fadeOutFrames} 0.2s forwards`,
});
