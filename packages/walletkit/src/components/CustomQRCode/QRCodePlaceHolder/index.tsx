import { Box } from '../../base/Box';
import { container, corner } from './styles.css';

export function QRCodePlaceHolder() {
  return (
    <Box className={container}>
      <Box as="span" className={corner} />
      <Box as="span" className={corner} />
      <Box as="span" className={corner} />
    </Box>
  );
}
