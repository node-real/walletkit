import { cssVar } from '@/core/base/utils/css';
import { hover } from '@/core/base/vanilla/index.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const clsWalletOption = style({
  height: 68,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: cssVar('walletOption', 'radii'),
  color: cssVar('walletOptionText'),
  background: cssVar('walletOptionBackground'),
  width: '100%',
  flexShrink: 0,
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
  width: 40,
  height: 40,
  borderRadius: cssVar('walletOptionIcon', 'radii'),
  overflow: 'hidden',
});

export const clsWalletOptionDisabled = style({
  cursor: 'not-allowed',
  opacity: 0.3,
  '@media': hover({
    color: cssVar('walletOptionText'),
    background: cssVar('walletOptionBackground'),
  }),
});

globalStyle(`${clsWalletOptionIcon} > *`, {
  width: '100%',
  height: '100%',
});
