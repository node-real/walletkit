import { cssVar, x } from '../../utils/css';

export const circleSpinner = x({
  position: 'relative',
  width: 100,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const circleSpinnerInner = x({
  borderRadius: '50%',
  overflow: 'hidden',
});

export const errorCircle = x({
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'absolute',
  border: `2px solid ${cssVar('error')}`,
});
