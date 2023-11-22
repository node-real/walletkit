import { SVGIconProps } from '@/types';

export const ForwardIcon = (props: SVGIconProps) => {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.49408 3.57709C9.81951 3.25165 10.3472 3.25165 10.6726 3.57709L16.5059 9.41042C16.8314 9.73586 16.8314 10.2635 16.5059 10.5889L10.6726 16.4223C10.3472 16.7477 9.81951 16.7477 9.49408 16.4223C9.16864 16.0968 9.16864 15.5692 9.49408 15.2438L13.9048 10.833H5.08333C4.6231 10.833 4.25 10.4599 4.25 9.99967C4.25 9.53944 4.6231 9.16634 5.08333 9.16634H13.9048L9.49408 4.7556C9.16864 4.43016 9.16864 3.90252 9.49408 3.57709Z"
      />
    </svg>
  );
};
