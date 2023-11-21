import { cssVar } from '@/index';
import { globalStyle, style } from '@vanilla-extract/css';

export const clsContainer = style({
  padding: '4px 8px',
  gap: 8,
  width: '100%',
  height: 'auto',
  flexShrink: 0,
  minHeight: 50,
  color: cssVar('chainOptionText'),
  background: cssVar('chainOptionBackground'),
  borderRadius: cssVar('chainOption', 'radii'),
  ':hover': {
    color: cssVar('chainOptionTextHover'),
    background: cssVar('chainOptionBackgroundHover'),
  },
});

export const clsChainOptionLogo = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: '50%',
  overflow: 'hidden',
  background: '#fff',
  flexShrink: 0,
});

globalStyle(`${clsChainOptionLogo} > svg`, {
  width: 24,
  height: 24,
});

export const clsChainOptionName = style({
  display: 'flex',
  flex: 1,
  textAlign: 'left',
  fontSize: 16,
  lineHeight: '19px',
  fontWeight: 600,
  padding: '15px 0',
});

export const clsConnectedTag = style({
  color: cssVar('primary'),
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '19px',
  flexShrink: 0,
});
