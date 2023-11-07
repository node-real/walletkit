import { style } from '@vanilla-extract/css';
import { cssVar } from '../../base/utils/css';

export const clsContainer = style({
  height: 50,
  width: '100%',
  gap: 8,
  border: '1px solid',
  borderRadius: cssVar('disconnectButton', 'radii'),
  background: cssVar('disconnectButtonBackground'),
  borderColor: cssVar('disconnectButtonBorder'),
  color: cssVar('disconnectButtonBackgroundText'),
  ':hover': {
    background: cssVar('disconnectButtonBackgroundHover'),
    color: cssVar('disconnectButtonBackgroundTextHover'),
    borderColor: cssVar('disconnectButtonBorderHover'),
  },
});
