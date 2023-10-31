import { style } from '@vanilla-extract/css';

export const qrCodeWrapper = style({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
});

export const qrCodeLogo = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'inline-flex',
  fontSize: 0,
});
