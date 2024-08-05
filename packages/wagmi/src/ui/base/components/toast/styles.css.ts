import { cssVar } from '@/ui/index';
import { style } from '@vanilla-extract/css';

export const clsToastRoot = style({
  position: 'fixed',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: cssVar('toast', 'zIndices'),
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  pointerEvents: 'none',
  width: '100%',
  color: cssVar('text'),
  maxWidth: 500,
});

export const clsContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '16px',
  margin: 8,
  background: cssVar('toastBackground'),
  position: 'relative',
  boxShadow: cssVar('toast', 'shadows'),
  borderRadius: cssVar('toast', 'radii'),
  wordWrap: 'break-word',
  pointerEvents: 'all',
});

export const clsIconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const clsDescWrapper = style({
  marginLeft: '8px',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '1.4',
});
