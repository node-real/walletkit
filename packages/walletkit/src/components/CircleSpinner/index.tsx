import { x } from '../../utils/css';
import { FlexProps } from '../base/Flex';
import { CircleLoadingIcon } from '../icons/CircleLoadingIcon';
import { keyframes } from '@emotion/react';
import { circleSpinner, circleSpinnerInner, errorCircle } from './styles';
import { Box } from '../base/Box';

export interface CircleSpinnerProps extends FlexProps {
  isLoading?: boolean;
  isError?: boolean;
  thickness?: number;
}

export function CircleSpinner(props: CircleSpinnerProps) {
  const { isLoading = false, isError = false, thickness = 2, children, css, ...restProps } = props;

  return (
    <Box className="wk-circle-spinner" css={x(circleSpinner, css)} {...restProps}>
      <Box css={circleSpinnerInner}>{children}</Box>
      {isLoading && (
        <Box
          css={{
            width: 52,
            height: 102,
            position: 'absolute',
            left: '50%',
            transformOrigin: '1px 50%',
            animation: `${rotateSpinner} 1200ms linear infinite`,
          }}
        >
          <CircleLoadingIcon thickness={thickness} />
        </Box>
      )}
      {isError && <Box css={errorCircle} />}
    </Box>
  );
}

const rotateSpinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
