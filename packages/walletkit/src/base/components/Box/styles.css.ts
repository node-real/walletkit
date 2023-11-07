import { style } from '@vanilla-extract/css';

export const clsBox = style({
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  transitionProperty: 'background,color,opacity',
  transitionDuration: '0.2s',
  textDecoration: 'none',
  '::before': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  '::after': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
});
