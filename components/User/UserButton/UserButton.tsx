import { useEffect } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Box, Flex, Group, rem, Text, UnstyledButton } from '@mantine/core';
import { useUser } from '../AuthProvider';
import classes from './UserButton.module.css';

export function UserButton({ compressed }: { compressed: boolean }) {
  const { user } = useUser();

  return (
    <Flex align="center" gap="xs">
      <Box style={{ flex: 1 }} ml="auto" mr="0" w="fit-content" hidden={compressed}>
        <Text size="sm" fw={900} ta="right">
          {user?.user_metadata?.full_name}
        </Text>

        <Text c="dimmed" size="xs" ta="right">
          {user?.user_metadata?.email}
        </Text>
      </Box>
      <Avatar mx="auto" src={user?.user_metadata?.avatar_url} radius="xl" />
    </Flex>
  );
}
