import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Box, Flex, Group, rem, Text, UnstyledButton } from '@mantine/core';
import classes from './UserButton.module.css';

export function UserButton({ compressed }: { compressed: boolean }) {
  return (
    <Flex w="100%" justify="space-between" gap="xs">
      <Box style={{ flex: 1 }} ml="auto" mr="0" w="fit-content" hidden={compressed}>
        <Text size="sm" fw={900} ta="left">
          Harriette Spoonlicker
        </Text>

        <Text c="dimmed" size="xs" ta="left">
          hspoonlicker@outlook.com
        </Text>
      </Box>
      <Avatar
        mx="auto"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
        radius="xl"
      />
    </Flex>
  );
}
