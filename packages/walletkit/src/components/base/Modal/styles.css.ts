import { keyframes, style } from '@vanilla-extract/css';
import { cssVar } from '../../../utils/css';

export const fadeInAnim = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const fadeOutAnim = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

export const fadeIn = style({
  animation: `${fadeInAnim} 0.2s forwards`,
});

export const fadeOut = style({
  animation: `${fadeOutAnim} 0.2s forwards`,
});

export const modal = style({
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

export const modalOverlay = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: cssVar('modalOverlay'),
});

export const modalContent = style({
  position: 'absolute',
  background: cssVar('modalBackground'),
  padding: '40px 24px',
  width: 'calc(100% - 32px)',
  maxWidth: 484,
  borderRadius: cssVar('modal', 'radii'),
});

export const modalHeader = style({
  fontWeight: 600,
  display: 'flex',
  fontSize: 24,
  lineHeight: 1.5,
  justifyContent: 'center',
  textAlign: 'center',
});
