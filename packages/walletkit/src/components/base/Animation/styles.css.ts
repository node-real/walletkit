import { keyframes, style } from '@vanilla-extract/css';

export const fadeInAnim = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const fadeOutAnim = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

export const fadeIn = style({
  animation: `${fadeInAnim} 0.2s forwards`,
});

export const fadeOut = style({
  animation: `${fadeOutAnim} 0.2s forwards`,
});
