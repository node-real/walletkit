import { style } from '@vanilla-extract/css';

export const clsContainer = style({
  alignItems: 'center',
});

export const clsOfficialButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
  gap: 4,
  cursor: 'pointer',
});
