import { style } from '@vanilla-extract/css';
import { cssVar } from '../../../utils/css';

export const walletkitButton = style({
  padding: '0 12px',
  borderRadius: cssVar('connectButton', 'radii'),
  height: 48,
  lineHeight: 1.5,
  fontWeight: 500,
  background: cssVar('connectButtonBackground'),
  color: cssVar('connectButtonText'),
  ':hover': {
    background: cssVar('connectButtonBackgroundHover'),
    color: cssVar('connectButtonTextHover'),
  },
});
