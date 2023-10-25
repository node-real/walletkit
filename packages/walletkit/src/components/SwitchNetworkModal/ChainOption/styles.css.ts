import { globalStyle, style } from '@vanilla-extract/css';
import { cssVar } from '../../../utils/css';

export const container = style({
  color: cssVar('chainOptionText'),
  background: cssVar('chainOptionBackground'),
  padding: '16px',
  gap: 20,
  width: '100%',
  borderRadius: cssVar('chainOption', 'radii'),
  height: 'auto',
  ':hover': {
    color: cssVar('chainOptionTextHover'),
    background: cssVar('chainOptionBackgroundHover'),
  },
});

export const chainOptionLogo = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  borderRadius: '50%',
  overflow: 'hidden',
  background: '#fff',
  flexShrink: 0,
});

globalStyle(`${chainOptionLogo} > svg`, {
  width: 26,
  height: 26,
});

export const chainOptionName = style({
  display: 'flex',
  flex: 1,
  textAlign: 'left',
  fontSize: 18,
  lineHeight: '22px',
  fontWeight: 600,
});
