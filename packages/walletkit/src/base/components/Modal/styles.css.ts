import { style } from '@vanilla-extract/css';
import { cssVar } from '../../../utils/css';

export const clsModal = style({
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
  transition: 'all 0.3s',
  boxSizing: 'border-box',
});

export const clsModalOverlay = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: cssVar('modalOverlay'),
});

export const clsModalContent = style({
  position: 'absolute',
  background: cssVar('modalBackground'),
  padding: '48px 24px',
  width: 'calc(100% - 32px)',
  maxWidth: 484,
  borderRadius: cssVar('modal', 'radii'),
});
