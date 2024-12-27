import { cssVar } from '@/core/base/utils/css';
import { hover } from '@/core/base/vanilla/index.css';
import { style } from '@vanilla-extract/css';

export const clsContainer = style({
  height: 50,
  width: '100%',
  gap: 8,
  border: '1px solid',
  borderRadius: cssVar('disconnectButton', 'radii'),
  background: cssVar('disconnectButtonBackground'),
  borderColor: cssVar('disconnectButtonBorder'),
  color: cssVar('disconnectButtonBackgroundText'),
  '@media': hover({
    background: cssVar('disconnectButtonBackgroundHover'),
    color: cssVar('disconnectButtonBackgroundTextHover'),
    borderColor: cssVar('disconnectButtonBorderHover'),
  }),
});
