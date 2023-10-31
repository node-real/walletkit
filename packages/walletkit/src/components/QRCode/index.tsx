import QRCodeUtil from 'qrcode';
import { ReactElement, useMemo } from 'react';
import { Box } from '../base/Box';
import { cx } from '../../utils/css';
import { qrCodeLogo, qrCodeWrapper } from './styles.css';

function generateMatrix(
  value: string,
  errorCorrectionLevel: QRCodeUtil.QRCodeErrorCorrectionLevel,
) {
  const arr = Array.prototype.slice.call(
    QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data,
    0,
  );
  const sqrt = Math.sqrt(arr.length);
  return arr.reduce(
    (rows, key, index) =>
      (index % sqrt === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows,
    [],
  );
}

export interface QRCodeProps {
  ecl?: QRCodeUtil.QRCodeErrorCorrectionLevel;
  logo?: ReactElement;
  logoSize?: number;
  size?: number;
  uri: string;
}

export function QRCode(props: QRCodeProps) {
  const { ecl = 'M', logo, logoSize = 52, size = 200, uri } = props;

  const dots = useMemo(() => {
    const dots: ReactElement[] = [];
    const matrix = generateMatrix(uri, ecl);
    const cellSize = size / matrix.length;
    const qrList = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];

    qrList.forEach(({ x, y }) => {
      const x1 = (matrix.length - 7) * cellSize * x;
      const y1 = (matrix.length - 7) * cellSize * y;
      for (let i = 0; i < 3; i++) {
        dots.push(
          <rect
            fill={i % 2 !== 0 ? 'var(--wk-colors-modalBackground)' : 'var(--wk-colors-qrCodeDot)'}
            height={cellSize * (7 - i * 2)}
            key={`${i}-${x}-${y}`}
            rx={(i - 2) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
            ry={(i - 2) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
            width={cellSize * (7 - i * 2)}
            x={x1 + cellSize * i}
            y={y1 + cellSize * i}
          />,
        );
      }
    });

    const clearArenaSize = Math.floor((logoSize + 25) / cellSize);
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2;
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1;

    matrix.forEach((row: QRCodeUtil.QRCode[], i: number) => {
      row.forEach((_: any, j: number) => {
        if (matrix[i][j]) {
          if (
            !(
              (i < 7 && j < 7) ||
              (i > matrix.length - 8 && j < 7) ||
              (i < 7 && j > matrix.length - 8)
            )
          ) {
            if (
              !(
                i > matrixMiddleStart &&
                i < matrixMiddleEnd &&
                j > matrixMiddleStart &&
                j < matrixMiddleEnd
              )
            ) {
              dots.push(
                <circle
                  cx={i * cellSize + cellSize / 2}
                  cy={j * cellSize + cellSize / 2}
                  fill="var(--wk-colors-qrCodeDot)"
                  key={`circle-${i}-${j}`}
                  r={cellSize / 3} // calculate size of single dots
                />,
              );
            }
          }
        }
      });
    });

    return dots;
  }, [ecl, logoSize, size, uri]);

  return (
    <Box
      className={cx('wk-qrcode', qrCodeWrapper)}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg height="100%" width="100%">
        {dots}
      </svg>
      <Box className={cx('wk-qrcode-logo', qrCodeLogo)}>{logo}</Box>
    </Box>
  );
}
