import { x } from '../../utils/css';

export const styles = {
  content: x({
    marginTop: 16,
    overflowY: 'auto',
    paddingBottom: 14,
  }),

  center: x({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
    paddingBottom: 32,
    position: 'relative',
  }),

  logoWrapper: x({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    svg: {
      width: 80,
      height: 80,
    },
  }),

  refreshIconWrapper: x({
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    cursor: 'pointer',
    zIndex: 2,
  }),
};
