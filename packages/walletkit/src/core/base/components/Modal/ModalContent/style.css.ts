import { cssVar } from '@/core/base/utils/css';
import { mobile } from '@/core/base/vanilla/index.css';
import { style } from '@vanilla-extract/css';

export const clsModalContent = style({
  position: 'absolute',
  background: cssVar('modalBackground'),
  padding: '48px 24px',
  width: 'calc(100% - 32px)',
  maxWidth: 484,
  borderRadius: cssVar('modal', 'radii'),
  '@media': mobile({
    width: '100%',
    maxWidth: '100vw',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 40,
    left: 0,
    bottom: 0,
  }),
});
