import { Flex, HStack, Heading, IconButton, Link } from '@totejs/uikit';

import { GitHubIcon } from '../../SvgIcon/GitHubIcon';
import { SwitchColorMode } from '../SwitchColorMode';

export function Header() {
  return (
    <>
      <Flex h={68} />

      <Flex
        h={68}
        right={0}
        left={0}
        top={0}
        position="fixed"
        zIndex={9}
        bg="bg.middle"
        justifyContent="space-between"
        alignItems="center"
        borderLeft="1px solid"
        borderBottom="1px solid"
        borderColor="readable.border"
        px={16}
      >
        <Heading fontSize={20}>WalletKit</Heading>
        <HStack spacing={16}>
          <Link
            href="https://github.com/node-real/walletkit/tree/main"
            isExternal
            display="inline-flex"
          >
            <IconButton variant="text" icon={<GitHubIcon />} color="readable.normal" />
          </Link>
          <SwitchColorMode />
        </HStack>
      </Flex>
    </>
  );
}
