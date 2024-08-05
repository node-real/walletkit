import { cssVar } from '@/ui/base/utils/css';
import { style } from '@vanilla-extract/css';

export const clsModal = style({
  width: '100%',
  maxWidth: 484,
});

export const clsContent = style({
  position: 'relative',
  border: '1px solid',
  borderColor: cssVar('border'),
  boxShadow: cssVar('normal', 'shadows'),
  padding: 24,
  width: '100%',
  maxWidth: 'unset',
});
