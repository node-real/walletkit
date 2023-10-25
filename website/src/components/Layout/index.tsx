import { Box, Flex } from '@totejs/uikit';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';

export function Layout() {
  return (
    <Flex minH={'100vh'}>
      <Box flex={1} overflowX="hidden">
        <Header />
        <Box m={32} p={24} bg="bg.middle" borderRadius={16}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}
