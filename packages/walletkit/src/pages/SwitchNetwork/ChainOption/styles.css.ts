import { MOBILE_MEDIA } from '@/base/constant';
import { cssVar } from '@/index';
import { style } from '@vanilla-extract/css';

export const clsContainer = style({
  padding: '4px 8px',
  gap: 8,
  width: '100%',
  height: 'auto',
  flexShrink: 0,
  color: cssVar('chainOptionText'),
  background: cssVar('chainOptionBackground'),
  borderRadius: cssVar('chainOption', 'radii'),
  ':hover': {
    color: cssVar('chainOptionTextHover'),
    background: cssVar('chainOptionBackgroundHover'),
  },
  '@media': {
    [MOBILE_MEDIA]: {
      padding: '3px 8px 3px 4px',
      gap: 4,
    },
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

export const clsChainOptionName = style({
  display: 'flex',
  flex: 1,
  textAlign: 'left',
  fontSize: 16,
  lineHeight: '19px',
  fontWeight: 600,
  padding: '8px 0',
});

export const clsConnectedTag = style({
  color: cssVar('primary'),
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '19px',
  flexShrink: 0,
});
