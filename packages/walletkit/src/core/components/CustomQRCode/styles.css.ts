import { cssVar } from '@/core/base/utils/css';
import { globalStyle, style } from '@vanilla-extract/css';

export const clsQrCodeContainer = style({
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

export const clsQrCodeWrapper = style({
  width: 212,
  height: 212,
  position: 'relative',
});

export const clsQrCodeLogo = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'inline-flex',
  borderRadius: 12,
  overflow: 'hidden',
});

globalStyle(`${clsQrCodeLogo} > svg`, {
  width: '100%',
  height: '100%',
});
