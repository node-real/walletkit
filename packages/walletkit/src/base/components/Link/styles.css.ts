import { cssVar } from '@/base/utils/css';
import { style } from '@vanilla-extract/css';

export const clsLink = style({
  textDecoration: 'none',
  ':visited': {
    color: 'unset',
  },
  ':hover': {
    color: cssVar('primaryActive'),
  },
});
