import { cssVar } from '@/ui/base/utils/css';
import { hover, mobile } from '@/ui/base/vanilla/index.css';
import { style } from '@vanilla-extract/css';

export const clsContent = style({});

export const clsGap = style({
  marginTop: 32,
});

export const clsButton = style({
  height: 56,
  width: '100%',
  borderRadius: cssVar('button', 'radii'),
  background: cssVar('buttonBackground'),
  color: cssVar('buttonText'),
  '@media': hover({
    background: cssVar('buttonBackgroundHover'),
    color: cssVar('buttonTextHover'),
  }),
});

export const clsFooter = style({
  marginTop: 40,
  marginBottom: -8,
  '@media': mobile({
    marginTop: 24,
    marginBottom: -16,
  }),
});
