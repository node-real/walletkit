import { cssVar } from '@/base/utils/css';
import { style } from '@vanilla-extract/css';

export const clsErrorTitle = style({
  display: 'flex',
  fontSize: 18,
  fontWeight: 500,
  lineHeight: '22px',
  alignItems: 'center',
  justifyContent: 'center',
  color: cssVar('error'),
  gap: 4,
});
