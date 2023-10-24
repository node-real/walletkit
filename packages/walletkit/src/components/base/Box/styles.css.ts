import { style } from '@vanilla-extract/css';

export const box = style({
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  transitionProperty: 'background,color,opacity',
  transitionDuration: '0.2s',
});
