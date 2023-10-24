import { Flex, FlexProps } from '../../../../components/base/Flex';
import { x } from '../../../../utils/css';
import { styles } from './styles';

export function InfoTitle(props: FlexProps) {
  const { children, css, ...restProps } = props;

  return (
    <Flex className="wk-info-title" css={x(styles.infoTitle, css)} {...restProps}>
      {children}
    </Flex>
  );
}
