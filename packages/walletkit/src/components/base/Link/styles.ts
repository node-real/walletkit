import { cssVar, x } from '../../../utils/css';

export const link = x({
  textDecoration: 'none',
  '&:visited': {
    color: 'unset',
  },
  '&:hover': {
    color: cssVar('primary'),
  },
});
