import { style } from '@vanilla-extract/css';

export const toastRoot = style({
  position: 'fixed',
  top: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 10001,
  gap: '16px',
});

export const container = style({
  display: 'flex',
  alignItems: 'center',
  padding: '16px 20px 16px 16px',
  background: '#ffffff',
  boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.08)',
  borderRadius: '8px',
  wordWrap: 'break-word',
});

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const descWrapper = style({
  marginLeft: '8px',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '1.4',
});
