import { style } from '@vanilla-extract/css';
import { cssVar } from '../../../utils/css';

export const walletkitButton = style({
  borderRadius: cssVar('connectButton', 'radii'),
  background: cssVar('connectButtonBackground'),
  color: cssVar('connectButtonText'),
  ':hover': {
    background: cssVar('connectButtonBackgroundHover'),
    color: cssVar('connectButtonTextHover'),
  },
});
