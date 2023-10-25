import { style } from '@vanilla-extract/css';
import { cssVar } from '../../../utils/css';

export const link = style({
  textDecoration: 'none',
  ':visited': {
    color: 'unset',
  },
  ':hover': {
    color: cssVar('primaryActive'),
  },
});
