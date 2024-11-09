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
  Group,
  rem,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { navbarLinks } from '@/Constants';
import { useActiveLinkStore } from '@/stores/activeLinkStore';
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
    <>
      <Box className={classes.section} px="md" pb="md">
        <UserButton />
      </Box>
      <div className={classes.section}>
        <Box px="md">
          <TextInput
            placeholder="Search"
            size="xs"
            leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
            rightSectionWidth={70}
            rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
            styles={{ section: { pointerEvents: 'none' } }}
            mb="sm"
          />
        </Box>

        <Box className={classes.mainLinks} px="md">
          <Stack gap="sm" mt="lg" mb={'xs'}>
            {navbarLinks?.map((link) => <NavbarLink key={link.label} {...link} />)}
          </Stack>
          {/* {mainLinks} */}
        </Box>
      </div>

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
    </>
  );
}

const NavbarLink = ({
  label,
  icon,
  color,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}) => {
  const Icon = icon;
  return (
    <Button
      variant="default"
      fullWidth
      radius="md"
      size="md"
      fz="sm"
      component={Link}
      href={href}
      rightSection={<Icon size={20} weight="fill" color={color} />}
      justify="space-between"
    >
      {label}
    </Button>
  );
};
