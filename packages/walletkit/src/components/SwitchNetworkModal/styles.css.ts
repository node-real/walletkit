import { style } from '@vanilla-extract/css';
import { cssVar } from '../../utils/css';

export const container = style({});

export const content = style({});

export const description = style({
  margin: '32px auto  24px auto',
});

export const chainList = style({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  lineHeight: 1.5,
  maxHeight: 324,
});

export const disconnectButton = style({
  width: '100%',
  gap: 8,
  borderRadius: cssVar('disconnectButton', 'radii'),
  background: cssVar('disconnectButtonBackground'),
  color: cssVar('disconnectButtonBackgroundText'),
  ':hover': {
    background: cssVar('disconnectButtonBackgroundHover'),
    color: cssVar('disconnectButtonBackgroundTextHover'),
  },
});
