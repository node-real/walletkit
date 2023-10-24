import { cx, x } from '../../../../utils/css';
import { Box, BoxProps } from '../../Box';
import { modalHeader } from '../styles';

export type ModalHeaderProps = BoxProps;

export function ModalHeader(props: ModalHeaderProps) {
  const { className, css, ...restProps } = props;

  return (
    <Box className={cx(className, 'wk-modal-header')} css={x(modalHeader, css)} {...restProps} />
  );
}
