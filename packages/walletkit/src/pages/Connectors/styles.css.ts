import { style } from '@vanilla-extract/css';

export const wallets = style({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const footer = style({
  marginTop: 32,
  display: 'flex',
  justifyContent: 'center',
});

export const downloadLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontSize: 14,
  fontWeight: 400,
});
