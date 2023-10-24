import { Flex, FlexProps } from '../../../components/base/Flex';
import { x } from '../../../utils/css';
import { styles } from './styles';

export function Content(props: FlexProps) {
  const { css, ...restProps } = props;
  return <Flex css={x(styles.content, css)} {...restProps} />;
}
