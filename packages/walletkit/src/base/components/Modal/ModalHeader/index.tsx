import { cx } from '../../../utils/css';
import { Box, BoxProps } from '../../Box';
import { clsModalHeader } from './styles.css';

export type ModalHeaderProps = BoxProps;

export function ModalHeader(props: ModalHeaderProps) {
  const { className, ...restProps } = props;

  return <Box className={cx('wk-modal-header', clsModalHeader, className)} {...restProps} />;
}
