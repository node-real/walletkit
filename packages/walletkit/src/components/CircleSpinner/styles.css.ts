import { keyframes, style } from '@vanilla-extract/css';
import { cssVar } from '../../utils/css';

export const circleSpinner = style({
  position: 'relative',
  width: 100,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const circleSpinnerInner = style({
  borderRadius: '50%',
  overflow: 'hidden',
});

export const errorCircle = style({
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'absolute',
  border: `2px solid ${cssVar('error')}`,
});

const rotateSpinner = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const loading = style({
  animation: `${rotateSpinner} 1200ms linear infinite`,
  width: 52,
  height: 102,
  position: 'absolute',
  left: '50%',
  transformOrigin: '1px 50%',
});
