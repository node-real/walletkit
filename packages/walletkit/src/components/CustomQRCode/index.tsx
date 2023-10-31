import { ReactElement } from 'react';
import { Box, BoxProps } from '../base/Box';
import { QRCode } from './QRCode';
import { QRCodePlaceHolder } from './QRCodePlaceHolder';
import { qrCodeContainer, qrCodeLogo, qrCodeWrapper } from './styles.css';
import { cx } from '../../utils/css';

export interface CustomQRCodeProps extends BoxProps {
  logo?: ReactElement;
  logoSize?: number;
  value?: string;
}

export function CustomQRCode(props: CustomQRCodeProps) {
  const { className, logo, logoSize = 52, value, ...restProps } = props;

  return (
    <Box className={cx('wk-qrcode', qrCodeContainer, className)} {...restProps}>
      <Box className={qrCodeWrapper}>
        {value ? <QRCode uri={value} /> : <QRCodePlaceHolder />}
        <Box
          className={cx('wk-qrcode-logo', qrCodeLogo)}
          style={{
            width: logoSize,
            height: logoSize,
          }}
        >
          {logo}
        </Box>
      </Box>
    </Box>
  );
}
