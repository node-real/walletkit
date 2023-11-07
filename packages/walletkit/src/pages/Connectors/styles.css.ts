import { style } from '@vanilla-extract/css';
import { cssVar } from '../..';

export const clsWallets = style({
  overflowY: 'auto',
  gap: 16,
});

export const clsDownloadLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontSize: 14,
  fontWeight: 400,
});

export const clsDisclaimer = style({
  marginTop: 8,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '17px',
  color: cssVar('textSecondary'),
  textAlign: 'center',
});
