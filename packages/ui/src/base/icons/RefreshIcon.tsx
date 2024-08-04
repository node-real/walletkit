import { SVGIconProps } from '@/types';

export const RefreshIcon = (props: SVGIconProps) => {
  return (
    <svg width="24" height="24" viewBox="4 0 16 16" fill="none" {...props}>
      <g filter="url(#filter0_d_1252_60835)">
        <circle cx="12" cy="8" r="8" fill="white" />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0606 7.15313L17.4251 4.09755L16.2902 3.96221L16.1688 4.98047C14.9544 3.30339 12.7897 2.46123 10.6705 3.02905C9.26479 3.40571 8.1519 4.32971 7.49968 5.51031C7.38574 5.7162 7.28498 5.93187 7.19881 6.15651C7.12849 6.33959 7.06849 6.52699 7.01932 6.71783C6.31348 9.44732 7.93882 12.2409 10.6676 12.9721C13.4111 13.7072 16.2311 12.0791 16.9662 9.33555L15.8623 9.03976C15.4796 10.4681 14.3704 11.5077 13.0388 11.8676L13.0368 11.8604C10.903 12.4321 8.70963 11.1658 8.13787 9.03195C7.5661 6.89808 8.83243 4.70474 10.9663 4.13297C11.6699 3.94444 12.38 3.95575 13.0362 4.13211M13.0362 4.13211C14.0054 4.39257 14.8573 5.01302 15.3977 5.88139L14.2429 5.93123L14.2921 7.07302L15.9276 7.00244L15.9258 7.01779L17.0606 7.15313"
        fill="url(#paint0_linear_1252_60835)"
      />
      <defs>
        <filter
          id="filter0_d_1252_60835"
          x="0"
          y="0"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1252_60835" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1252_60835"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1252_60835"
          x1="13.1862"
          y1="3.58419"
          x2="10.8183"
          y2="12.4204"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1D1010" />
          <stop offset="1" stopColor="#26282E" stopOpacity="0.24" />
        </linearGradient>
      </defs>
    </svg>
  );
};
