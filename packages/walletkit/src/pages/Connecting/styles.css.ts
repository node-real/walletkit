import { style, globalStyle } from '@vanilla-extract/css';
import { cssVar } from '../..';

export const clsContent = style({
  overflowY: 'auto',
});

export const clsLogoWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${clsLogoWrapper} > svg`, {
  width: 80,
  height: 80,
});

export const clsGap = style({
  marginTop: 32,
});

export const clsButton = style({
  height: 56,
  width: '100%',
  borderRadius: cssVar('button', 'radii'),
  background: cssVar('buttonBackground'),
  color: cssVar('buttonText'),
  ':hover': {
    background: cssVar('buttonBackgroundHover'),
    color: cssVar('buttonTextHover'),
  },
});

export const clsFooter = style({
  marginTop: 40,
  marginBottom: -8,
});
