import { style, globalStyle } from '@vanilla-extract/css';

export const content = style({
  overflowY: 'auto',
  paddingBottom: 14,
});

export const center = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: 32,
  position: 'relative',
});

export const logoWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${logoWrapper} > svg`, {
  width: 80,
  height: 80,
});

export const refreshIconWrapper = style({
  width: 100,
  height: 100,
  position: 'absolute',
  bottom: 0,
  right: 0,
  cursor: 'pointer',
  zIndex: 2,
});
