import { style } from '@vanilla-extract/css';
import { cssVar } from '../../utils/css';
import { hover } from '../../vanilla/index.css';

export const clsLink = style({
  textDecoration: 'none',
  ':visited': {
    color: 'unset',
  },
  '@media': hover({
    color: cssVar('primaryActive'),
  }),
});
