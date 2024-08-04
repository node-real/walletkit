import { cssVar } from '@/base/utils/css';
import { hover } from '@/base/vanilla/index.css';
import { style } from '@vanilla-extract/css';

export const clsLink = style({
  textDecoration: 'none',
  ':visited': {
    color: 'unset',
  },
  '@media': hover({
    color: cssVar('primaryActive'),
  }),
});
