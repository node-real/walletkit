import { cssVar } from '@/core/base/utils/css';
import { hover } from '@/core/base/vanilla/index.css';
import { style } from '@vanilla-extract/css';

export const clsWalletkitButton = style({
  height: 40,
  padding: '0 12px',
  fontSize: 14,
  lineHeight: '17px',
  borderRadius: cssVar('connectButton', 'radii'),
  background: cssVar('connectButtonBackground'),
  color: cssVar('connectButtonText'),
  gap: 8,
  '@media': hover({
    background: cssVar('connectButtonBackgroundHover'),
    color: cssVar('connectButtonTextHover'),
  }),
});
