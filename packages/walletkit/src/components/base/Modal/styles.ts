import { cssVar, x } from '../../../utils/css';

export const modal = x({
  zIndex: 10000,
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: cssVar('text'),
  margin: 0,
  padding: 0,
});

export const modalOverlay = x({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: cssVar('modalOverlay'),
});

export const modalContent = x({
  position: 'absolute',
  background: '#fff',
  padding: '40px 24px',
  width: 'calc(100% - 32px)',
  maxWidth: 484,
  borderRadius: cssVar('modal', 'radii'),
});

export const modalHeader = x({
  fontWeight: 600,
  display: 'flex',
  fontSize: 24,
  lineHeight: 1.5,
  justifyContent: 'center',
});
