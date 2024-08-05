import { cssVar } from '@/ui/base/utils/css';
import { mobile, hover } from '@/ui/base/vanilla/index.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const clsWalletOptionWrapper = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: 111,
  '@media': mobile({
    height: 99,
  }),
});

export const clsWalletOption = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: '8px 0',
  borderRadius: 16,
  gap: 8,
  width: '100%',
  height: 'auto',
  color: cssVar('textSecondary'),
  background: 'transparent',
  '@media': hover({
    background: cssVar('walletOptionBackgroundHover'),
  }),
});

export const clsWalletOptionName = style({
  fontSize: 16,
  lineHeight: '19px',
  fontWeight: 600,
  textAlign: 'center',
  '@media': mobile({
    fontSize: 12,
    lineHeight: '15px',
  }),
});

export const clsWalletOptionIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 68,
  height: 68,
  borderRadius: 16,
  overflow: 'hidden',
  flexShrink: 0,
  '@media': mobile({
    width: 60,
    height: 60,
  }),
});

globalStyle(`${clsWalletOptionIcon} > *`, {
  width: '100%',
  height: '100%',
});

export const clsWalletOptionDisabled = style({
  cursor: 'not-allowed',
  opacity: 0.3,
  '@media': hover({
    background: 'transparent',
  }),
});
