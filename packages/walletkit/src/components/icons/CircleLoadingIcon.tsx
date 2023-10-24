import { cssVar } from '../../utils/css';

export interface CircleLoadingIconProps extends React.SVGProps<SVGSVGElement> {
  thickness?: number;
}

export function CircleLoadingIcon(props: CircleLoadingIconProps) {
  const { thickness, ...restProps } = props;

  const startStopColor = cssVar('modalBackground');
  const endStopColor = cssVar('primaryActive');

  return (
    <svg width="52" height="102" viewBox="0 0 52 102" fill="none" {...restProps}>
      <path
        d="M1 101C28.6142 101 51 78.6142 51 51C51 23.3858 28.6142 1 1 1"
        stroke="url(#paint0_linear_1252_60553)"
        strokeWidth={thickness}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1252_60553"
          x1="1"
          y1="1"
          x2="0.999999"
          y2="101"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={startStopColor} />
          <stop offset="1" stopColor={endStopColor} />
        </linearGradient>
      </defs>
    </svg>
  );
}
