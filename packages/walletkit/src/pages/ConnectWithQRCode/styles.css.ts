import { style } from '@vanilla-extract/css';
import { cssVar } from '../..';

export const qrCodeContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 32,
  flexDirection: 'column',
});

export const qrCodeWrapper = style({
  width: 240,
  height: 240,
  padding: 14,
  border: '1px solid',
  borderColor: cssVar('qrCodeBorder'),
  borderRadius: cssVar('qrCode', 'radii'),
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
