import { cssVar } from '@/core/base/utils/css';
import { style } from '@vanilla-extract/css';

export const clsDisclaimer = style({
  marginTop: 8,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '17px',
  color: cssVar('textSecondary'),
  textAlign: 'center',
});
