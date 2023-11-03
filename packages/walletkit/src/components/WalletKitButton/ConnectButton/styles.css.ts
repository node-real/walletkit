import { style } from '@vanilla-extract/css';
import { cssVar } from '../../../utils/css';

export const clsWalletkitButton = style({
  height: 40,
  padding: '0 12px',
  fontSize: 14,
  lineHeight: '17px',
  borderRadius: cssVar('connectButton', 'radii'),
  background: cssVar('connectButtonBackground'),
  color: cssVar('connectButtonText'),
  gap: 8,
  ':hover': {
    background: cssVar('connectButtonBackgroundHover'),
    color: cssVar('connectButtonTextHover'),
  },
});
