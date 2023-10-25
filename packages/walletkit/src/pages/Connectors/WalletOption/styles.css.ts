import { style } from '@vanilla-extract/css';
import { cssVar } from '../../../utils/css';

export const walletOption = style({
  height: 68,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: cssVar('walletOption', 'radii'),
  fontSize: 16,
  color: cssVar('walletOptionText'),
  background: cssVar('walletOptionBackground'),
  ':hover': {
    color: cssVar('walletOptionTextHover'),
    background: cssVar('walletOptionBackgroundHover'),
  },
});

export const walletOptionName = style({
  flex: 1,
  fontSize: 18,
  fontWeight: 600,
  textAlign: 'left',
});

export const walletOptionIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 52,
  height: 52,
  borderRadius: cssVar('walletOptionIcon', 'radii'),
  overflow: 'hidden',
});
