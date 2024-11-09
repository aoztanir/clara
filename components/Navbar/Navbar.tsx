'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AlignLeft, ArrowDown, GearSix, VideoCamera } from '@phosphor-icons/react';
import { IconBulb, IconCheckbox, IconLogout, IconSearch, IconUser } from '@tabler/icons-react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Code,
  Divider,
  Flex,
  Group,
  rem,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { navbarLinks } from '@/Constants';
import { useActiveLinkStore } from '@/stores/activeLinkStore';
import { useNavbarCompressedStore } from '@/stores/navbarCompressedStore';
import { UserButton } from '../User/UserButton/UserButton';
import classes from './NavbarSearch.module.css';

const links = [
  { icon: IconBulb, label: 'Activity', notifications: 3 },
  { icon: IconCheckbox, label: 'Tasks', notifications: 4 },
  { icon: IconUser, label: 'Contacts' },
];

const collections = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' },
];

export function NavbarSearch() {
  const pathname = usePathname();
  const { hovered, ref } = useHover();
  const compressed = useNavbarCompressedStore((state) => state.compressed);
  const setCompressed = useNavbarCompressedStore((state) => state.setCompressed);

  useEffect(() => {
    setCompressed(!hovered);
  }, [hovered]);

  const setActiveLink = useActiveLinkStore((state) => state.setActiveLink);

  useEffect(() => {
    setActiveLink(navbarLinks.find((link) => link.href === pathname));
  }, [pathname]);
  const collectionLinks = collections.map((collection) => (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>{collection.emoji}</span>{' '}
      {collection.label}
    </a>
  ));

  return (
    <Box
      ref={ref}
      style={{ height: '100%', position: 'relative' }}
      p={compressed ? '0' : 'sm'}
      // py="md"
    >
      <Box className={classes.section} px="md" pt={compressed ? 'md' : '0'}>
        <UserButton compressed={compressed} />
      </Box>
      <Divider my="sm" />
      <div className={classes.section}>
        <Box className={classes.mainLinks} px="md">
          <Stack gap="sm" mb={'xs'}>
            {navbarLinks?.map((link) => (
              <NavbarLink compressed={compressed} key={link.label} {...link} />
            ))}
          </Stack>
        </Box>
      </div>
      <Divider mb="sm" />
      {compressed ? (
        <></>
      ) : (
        <Box className={classes.section} px="5">
          <Group className={classes.collectionsHeader} justify="space-between">
            <Text size="xs" fw={500} c="dimmed">
              Past Interviews
            </Text>

            <ActionIcon variant="transparent" size={18} c="dimmed">
              <ArrowDown weight="bold" />
            </ActionIcon>
          </Group>
          <div className={classes.collections}>{collectionLinks}</div>
        </Box>
      )}

      <Flex
        h="100%"
        justify="center"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
        p="md"
      >
        {compressed ? (
          <ActionIcon size="50" radius="15px" mb="0" mt="auto" variant="default">
            <IconLogout
              color="var(--mantine-color-red-6)"
              style={{ transform: 'rotate(180deg)' }}
              size={25}
            />
          </ActionIcon>
        ) : (
          <Button
            fullWidth
            mb="0"
            mt="auto"
            variant="default"
            c="var(--mantine-color-red-6)"
            rightSection={
              <IconLogout
                color="var(--mantine-color-red-6)"
                style={{ transform: 'rotate(180deg)' }}
                size={20}
              />
            }
            justify="space-between"
            radius="md"
          >
            Logout
          </Button>
        )}
      </Flex>
    </Box>
  );
}

const NavbarLink = ({
  label,
  icon,
  color,
  href,
  compressed = true,
  active = false,
}: {
  label: string;
  icon: React.ReactNode;
  color: string;
  href: string;
  compressed?: boolean;
}) => {
  const Icon = icon;
  const activeLink = useActiveLinkStore((state) => state.activeLink);

  if (compressed) {
    return (
      <ActionIcon
        mx="auto"
        variant={activeLink?.href === href ? 'light' : 'default'}
        color={activeLink?.href === href ? 'var(--mantine-color-indigo-6)' : null}
        size="50"
        radius="15px"
        style={{ zIndex: 1000 }}
      >
        {<Icon size={25} weight="fill" color={color} />}
      </ActionIcon>
    );
  }
  return (
    <Button
      variant={activeLink?.href === href ? 'light' : 'default'}
      color={activeLink?.href === href ? 'var(--mantine-color-indigo-6)' : null}
      c="var(--mantine-color-text)"
      fullWidth
      radius="md"
      size="md"
      fz="sm"
      component={Link}
      href={href}
      style={{ zIndex: 1000 }}
      rightSection={<Icon size={20} weight="fill" color={color} />}
      justify="space-between"
    >
      {label}
    </Button>
  );
};
