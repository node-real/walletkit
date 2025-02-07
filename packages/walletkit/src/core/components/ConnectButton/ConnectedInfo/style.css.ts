import { cssVar } from '@/core/base/utils/css';
import { hover } from '@/core/base/vanilla/index.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const clsInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});
globalStyle(`${clsInfo} svg`, {
  width: 24,
  height: 24,
});

export const clsWrongButton = style({
  color: '#fff',
  background: cssVar('error'),
  '@media': hover({
    color: '#fff',
    background: cssVar('errorActive'),
  }),
});

export const clsChainButton = style({
  gap: 4,
});

export const clsChainLogo = style({
  borderRadius: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const clsAccountButton = style({
  gap: 0,
  padding: 0,
});

export const clsBalance = style({
  padding: '4px 12px',
});

export const clsSeparator = style({
  height: 24,
  width: 1,
  background: cssVar('disabled'),
});

export const clsAddress = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  height: '100%',
  padding: '4px 12px',
});
