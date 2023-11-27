import { cssVar } from '@/base/utils/css';
import { hover } from '@/base/vanilla/index.css';
import { style } from '@vanilla-extract/css';

export const clsIconButton = style({
  width: 24,
  height: 24,
  borderRadius: cssVar('navButton', 'radii'),
  padding: 0,
  background: 'transparent',
  color: cssVar('navButtonText'),
  '@media': hover({
    background: cssVar('navButtonBackgroundHover'),
  }),
});
