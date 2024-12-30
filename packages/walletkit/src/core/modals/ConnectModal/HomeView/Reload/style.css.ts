import { style } from '@vanilla-extract/css';

export const clsContent = style({
  fontSize: '16px',
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
});

export const clsReloadBtn = style({
  width: '100%',
  marginLeft: '4px',
  textDecoration: 'underline',
  cursor: 'pointer',
});
