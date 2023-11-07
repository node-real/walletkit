import { style } from '@vanilla-extract/css';
import { cssVar } from '../../utils/css';

export const clsIconButton = style({
  width: 24,
  height: 24,
  borderRadius: cssVar('navButton', 'radii'),
  padding: 0,
  background: 'transparent',
  color: cssVar('navButtonText'),
  ':hover': {
    background: cssVar('navButtonBackgroundHover'),
  },
});
