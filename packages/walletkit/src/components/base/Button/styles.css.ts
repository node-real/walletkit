import { style } from '@vanilla-extract/css';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  height: 56,
  padding: '0 16px',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.5,
});
