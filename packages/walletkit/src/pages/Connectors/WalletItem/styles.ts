import { cssVar, x } from '../../../utils/css';

export const wallet = x({
  height: 68,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: cssVar('walletItem', 'radii'),
  fontSize: 16,
  background: cssVar('walletItemBackground'),
  '&:hover': {
    background: cssVar('walletItemBackgroundHover'),
  },
});

export const walletName = x({
  flex: 1,
  fontSize: 18,
  fontWeight: 600,
  textAlign: 'left',
});

export const walletIcon = x({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 52,
  height: 52,
  borderRadius: cssVar('walletItemIcon', 'radii'),
  overflow: 'hidden',
});
