import { Flex, FlexProps } from '../../../../components/base/Flex';
import { AlertIcon } from '../../../../components/icons/AlertIcon';
import { x } from '../../../../utils/css';
import { styles } from './styles';

export function ErrorTitle(props: FlexProps) {
  const { children, css, ...restProps } = props;

  return (
    <Flex className="wk-error-title" css={x(styles.errorTitle, css)} {...restProps}>
      <AlertIcon />
      {children}
    </Flex>
  );
}
