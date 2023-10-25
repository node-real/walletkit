import { style } from '@vanilla-extract/css';
import { cssVar } from '../../../utils/css';

export const iconButton = style({
  width: 24,
  height: 24,
  borderRadius: 4,
  padding: 0,
  background: 'transparent',
  color: cssVar('closeButtonText'),
  ':hover': {
    background: cssVar('closeButtonBackgroundHover'),
  },
});
