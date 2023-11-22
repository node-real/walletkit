import { MOBILE_MEDIA } from '@/base/constant';
import { cssVar } from '@/base/utils/css';
import { style } from '@vanilla-extract/css';

export const clsWallets = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  rowGap: 24,
  columnGap: 15,
  '@media': {
    [MOBILE_MEDIA]: {
      rowGap: 16,
      columnGap: 4.5,
    },
  },
});

export const clsNoWalletButton = style({
  height: 50,
  width: '100%',
  gap: 10,
  border: '1px solid',
  borderRadius: cssVar('noWalletButton', 'radii'),
  background: cssVar('noWalletButtonBackground'),
  borderColor: cssVar('noWalletButtonBorder'),
  color: cssVar('noWalletButtonBackgroundText'),
  ':hover': {
    background: cssVar('noWalletButtonBackgroundHover'),
    color: cssVar('noWalletButtonBackgroundTextHover'),
    borderColor: cssVar('noWalletButtonBorderHover'),
  },
});
