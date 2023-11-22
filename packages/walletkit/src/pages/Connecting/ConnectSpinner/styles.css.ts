import { cssVar } from '@/base/utils/css';
import { globalStyle, keyframes, style } from '@vanilla-extract/css';

export const clsContainer = style({
  position: 'relative',
  width: 100,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const clsLogo = style({
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${clsLogo} > *`, {
  width: 80,
  height: 80,
});

export const clsErrorCircle = style({
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'absolute',
  border: `2px solid ${cssVar('error')}`,
  marginTop: 2,
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
  left: '50%',
  transformOrigin: '1px 50%',
  marginTop: 2,
});
