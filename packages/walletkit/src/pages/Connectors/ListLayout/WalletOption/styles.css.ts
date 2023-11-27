import { hover } from '@/base/vanilla/index.css';
import { cssVar } from '@/index';
import { style } from '@vanilla-extract/css';

export const clsWalletOption = style({
  height: 68,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: cssVar('walletOption', 'radii'),
  color: cssVar('walletOptionText'),
  background: cssVar('walletOptionBackground'),
  width: '100%',
  '@media': hover({
    color: cssVar('walletOptionTextHover'),
    background: cssVar('walletOptionBackgroundHover'),
  }),
});

export const clsWalletOptionName = style({
  flex: 1,
  fontSize: 18,
  fontWeight: 600,
  textAlign: 'left',
});

export const clsWalletOptionIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 52,
  height: 52,
  borderRadius: cssVar('walletOptionIcon', 'radii'),
  overflow: 'hidden',
});
