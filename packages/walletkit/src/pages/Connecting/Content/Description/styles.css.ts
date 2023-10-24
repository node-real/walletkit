import { style } from '@vanilla-extract/css';
import { cssVar } from '../../../../utils/css';

export const description = style({
  display: 'flex',
  maxWidth: 340,
  marginTop: 8,
  fontSize: 18,
  textAlign: 'center',
  lineHeight: '22px',
  fontWeight: 400,
  color: cssVar('textSecondary'),
});
