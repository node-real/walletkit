import { Box, Flex } from '@node-real/uikit';
import { Header } from './Header';

export function Layout(props: React.PropsWithChildren) {
  return (
    <Flex minH={'100vh'}>
      <Box flex={1} overflowX="hidden">
        <Header />
        <Box m={32} p={24} bg="bg.middle" borderRadius={16}>
          {props.children}
        </Box>
      </Box>
    </Flex>
  );
}
