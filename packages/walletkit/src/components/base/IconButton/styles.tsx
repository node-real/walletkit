import { cssVar, x } from '../../../utils/css';

export const iconButton = x({
  width: 24,
  height: 24,
  borderRadius: 4,
  background: 'transparent',
  color: cssVar('closeButtonText'),
  '&:hover': {
    background: cssVar('closeButtonBackgroundHover'),
  },
});
