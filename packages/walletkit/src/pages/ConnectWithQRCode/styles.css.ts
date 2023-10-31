import { style } from '@vanilla-extract/css';

export const container = style({
  alignItems: 'center',
});

export const officialButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 32,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
  gap: 4,
  cursor: 'pointer',
});
