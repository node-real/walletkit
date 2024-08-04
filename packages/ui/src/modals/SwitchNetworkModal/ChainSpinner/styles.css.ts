import { keyframes, style } from '@vanilla-extract/css';

export const clsContainer = style({
  width: 42,
  height: 42,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  flexShrink: 0,
});

const rotateSpinner = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const clsLoading = style({
  animation: `${rotateSpinner} 1200ms linear infinite`,
  position: 'absolute',
  left: 0,
  top: 0,
  transformOrigin: '100% 100%',
});
