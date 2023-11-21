import { ReactElement } from 'react';
import { QRCode } from './QRCode';
import { QRCodePlaceHolder } from './QRCodePlaceHolder';
import { clsQrCodeContainer, clsQrCodeLogo, clsQrCodeWrapper } from './styles.css';
import { Box, BoxProps } from '@/base/components/Box';
import { cx } from '@/index';

export interface CustomQRCodeProps extends BoxProps {
  logo?: ReactElement;
  logoSize?: number;
  value?: string;
}

export function CustomQRCode(props: CustomQRCodeProps) {
  const { className, logo, logoSize = 52, value, ...restProps } = props;

  return (
    <Box className={cx('wk-qrcode', clsQrCodeContainer, className)} {...restProps}>
      <Box className={clsQrCodeWrapper}>
        {value ? <QRCode uri={value} /> : <QRCodePlaceHolder />}
        <Box
          className={cx('wk-qrcode-logo', clsQrCodeLogo)}
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
