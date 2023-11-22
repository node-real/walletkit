import { cssVar } from '@/base/utils/css';
import { style } from '@vanilla-extract/css';

export const clsDescription = style({
  display: 'flex',
  maxWidth: 340,
  fontSize: 18,
  textAlign: 'center',
  lineHeight: '22px',
  fontWeight: 400,
  color: cssVar('textSecondary'),
});
