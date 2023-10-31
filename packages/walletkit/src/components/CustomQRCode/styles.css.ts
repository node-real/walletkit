import { globalStyle, style } from '@vanilla-extract/css';
import { cssVar } from '../../utils/css';

export const qrCodeContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 240,
  height: 240,
  overflow: 'hidden',
  fontSize: 0,
  border: '1px solid',
  borderColor: cssVar('qrCodeBorder'),
  borderRadius: cssVar('qrCode', 'radii'),
});

export const qrCodeWrapper = style({
  width: 212,
  height: 212,
  position: 'relative',
});

export const qrCodeLogo = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'inline-flex',
});

globalStyle(`${qrCodeLogo} > svg`, {
  width: '100%',
  height: '100%',
});
