import Link from 'next/link';
import { ArrowRight, Bell } from '@phosphor-icons/react';
import { Box, Flex, Group, Text, ThemeIcon, Title } from '@mantine/core';
import { useActiveLinkStore } from '@/stores/activeLinkStore';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { UserButton } from '../User/UserButton/UserButton';

export default function Header() {
  const activeLink = useActiveLinkStore((state) => state.activeLink);
  return (
    <Group w="100%" h="100%" px="md">
      <Box>
        <Title order={1} fw="900" fz="20">
          {activeLink?.label}
        </Title>
        <Flex gap="5" align="center">
          <Text mt="0" c="dimmed" fz="xs" component={Link} href="/dashboard">
            Dashboard
          </Text>
          <ArrowRight size={10} />
          <Text mt="0" c="dimmed" fz="xs">
            {activeLink?.label}
          </Text>
        </Flex>
      </Box>
      <Group gap="xs" w="fit-content" mr="0" ml="auto">
        <ColorSchemeToggle />
        <ThemeIcon
          size="xl"
          mr="0"
          ml="auto"
          variant="transparent"
          color="var(--mantine-color-text)"
        >
          <Bell size={20} weight="fill" />
        </ThemeIcon>
        <UserButton />
      </Group>
    </Group>
  );
}
