import { MoonIcon, SunIcon } from '@node-real/icons';
import { Circle, Flex, useColorMode } from '@node-real/uikit';

export function SwitchColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      borderRadius={24}
      w={72}
      h={40}
      bg="bg.bottom"
      px={4}
      alignItems="center"
      justifyContent="space-between"
      onClick={toggleColorMode}
      cursor="pointer"
    >
      <Circle
        boxSize={32}
        bg={colorMode === 'light' ? 'scene.primary.normal' : undefined}
        color="dark.readable.normal"
      >
        <SunIcon />
      </Circle>
      <Circle
        boxSize={32}
        bg={colorMode === 'dark' ? 'scene.primary.normal' : undefined}
        color={colorMode === 'dark' ? 'dark.readable.normal' : undefined}
      >
        <MoonIcon />
      </Circle>
    </Flex>
  );
}
