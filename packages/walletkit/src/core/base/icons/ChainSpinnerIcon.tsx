import { cssVar } from '../utils/css';

export const ChainSpinnerIcon = (props: SVGIconProps) => {
  const stopColor = cssVar('primaryActive');

  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" {...props}>
      <path
        d="M2 19C2 9.61116 9.61116 2 19 2"
        stroke="url(#paint0_linear_5519_81784)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5519_81784"
          x1="19"
          y1="2"
          x2="2"
          y2="15.7619"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={stopColor} />
          <stop offset="1" stopColor={stopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
