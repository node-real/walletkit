import { style, keyframes } from '@vanilla-extract/css';
import { cssVar } from '../../..';

const flicker = keyframes({
  '0%': {
    backgroundPosition: '100% 0',
  },
  '100%': {
    backgroundPosition: '-100% 0',
  },
});

export const container = style({
  width: '100%',
  height: '100%',
  opacity: 0.1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  pointerEvents: 'none',
  '::before': {
    zIndex: 3,
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundPosition: 'initial',
    backgroundRepeat: 'repeat',
    backgroundAttachment: 'initial',
    backgroundOrigin: 'initial',
    backgroundClip: 'initial',
    backgroundColor: 'initial',
    backgroundSize: '1.888% 1.888%',
    backgroundImage: `radial-gradient(${cssVar('qrCodeDot')} 41%,transparent 41%)`,
  },
  '::after': {
    zIndex: 5,
    content: '""',
    position: 'absolute',
    inset: 0,
    transform: 'scale(2) rotate(45deg)',
    backgroundImage:
      'linear-gradient(90deg, rgba(255, 255, 255, 0) 50%, rgb(255, 255, 255), rgba(255, 255, 255, 0))',
    backgroundSize: '200% 100%',
    animation: `1000ms linear 0s infinite normal both running ${flicker}`,
  },
});

export const corner = style({
  zIndex: 4,
  position: 'absolute',

  background: cssVar('qrCodeDot'),
  borderRadius: 8,
  width: '13.2%',
  height: '13.2%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: `3px solid ${cssVar('modalBackground')}`,
  '::before': {
    content: '""',
    width: '42.86%',
    height: '42.86%',
    borderRadius: 4,
    border: `4px solid ${cssVar('modalBackground')}`,
  },
  selectors: {
    '&:nth-child(1)': {
      left: 0,
      top: 0,
    },
    '&:nth-child(2)': {
      right: 0,
      top: 0,
    },
    '&:nth-child(3)': {
      left: 0,
      bottom: 0,
    },
  },
});
