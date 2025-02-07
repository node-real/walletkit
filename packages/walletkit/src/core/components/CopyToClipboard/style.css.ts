import { globalStyle, style } from '@vanilla-extract/css';

export const clsCopy = style({
  cursor: 'pointer',
  fontSize: 18,
  fontWeight: 500,
  lineHeight: '22px',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  maxWidth: 340,
  wordBreak: 'break-word',
});

globalStyle(`${clsCopy} svg`, {
  flexShrink: 0,
});
