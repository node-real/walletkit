import QRCodeUtil from 'qrcode';
import { ReactElement, useMemo } from 'react';

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
  clearSize?: number;
  size?: number;
  uri: string;
}

export function QRCode(props: QRCodeProps) {
  const { ecl = 'M', clearSize = 40, size = 212, uri } = props;

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
        const width = cellSize * (7 - i * 2);
        const r = [8, 4, 0][i];

        dots.push(
          <rect
            key={`${i}-${x}-${y}`}
            fill={i % 2 === 0 ? 'var(--wk-colors-qrCodeDot)' : 'var(--wk-colors-modalBackground)'}
            height={width}
            width={width}
            rx={r}
            ry={r}
            x={x1 + cellSize * i}
            y={y1 + cellSize * i}
          />,
        );
      }
    });

    const clearArenaSize = Math.ceil(clearSize / cellSize) + 4;
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
  }, [ecl, clearSize, size, uri]);

  return (
    <svg height="100%" width="100%" viewBox={`0 0 ${size} ${size}`}>
      {dots}
    </svg>
  );
}
