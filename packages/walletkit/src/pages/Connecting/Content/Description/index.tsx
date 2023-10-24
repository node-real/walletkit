import { Flex, FlexProps } from '../../../../components/base/Flex';
import { x } from '../../../../utils/css';
import { styles } from './styles';

export function Description(props: FlexProps) {
  const { css, ...restProps } = props;

  return <Flex className="wk-description" css={x(styles.description, css)} {...restProps} />;
}
