import { style } from '@vanilla-extract/css';
import { cssVar } from '../../../../utils/css';

export const errorTitle = style({
  display: 'flex',
  fontSize: 18,
  fontWeight: 500,
  lineHeight: '22px',
  alignItems: 'center',
  justifyContent: 'center',
  color: cssVar('error'),
  gap: 3,
});
