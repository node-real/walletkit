import { style } from '@vanilla-extract/css';

export const button = style({
  fontWeight: 400,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  lineHeight: 1.5,
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'inherit',
});
