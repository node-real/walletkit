import { SVGIconProps } from '@/types';

export const BackIcon = (props: SVGIconProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.5118 8.82165C25.1627 9.47253 25.1627 10.5278 24.5118 11.1787L15.6904 20.0002L24.5118 28.8217C25.1627 29.4725 25.1627 30.5278 24.5118 31.1787C23.861 31.8295 22.8057 31.8295 22.1548 31.1787L12.1548 21.1787C11.5039 20.5278 11.5039 19.4725 12.1548 18.8217L22.1548 8.82165C22.8057 8.17078 23.861 8.17078 24.5118 8.82165Z"
      />
    </svg>
  );
};
