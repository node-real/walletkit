import { cssVar } from '@/index';
import { style } from '@vanilla-extract/css';

export const clsContent = style({
  overflowY: 'auto',
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
