import { Box } from '../../../base/components/Box';
import { clsContainer, clsCorner } from './styles.css';

export function QRCodePlaceHolder() {
  return (
    <Box className={clsContainer}>
      <Box as="span" className={clsCorner} />
      <Box as="span" className={clsCorner} />
      <Box as="span" className={clsCorner} />
    </Box>
  );
}
