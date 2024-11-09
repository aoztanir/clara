'use client';

import { Moon, MoonStars, Sun } from '@phosphor-icons/react';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import {
  Button,
  Group,
  rem,
  Switch,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';

export function ColorSchemeToggle({ ...props }: { props: any }) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();

  return (
    <Switch
      // style={{ position: 'fixed', left: 15, bottom: 15, zIndex: 1000 }}
      size="sm"
      color="dark.4"
      checked={computedColorScheme === 'dark'}
      onClick={() => setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')}
      {...props}
    />
  );
  // return (
  //   <Group justify="center" mt="xl">
  //     <Button onClick={() => setColorScheme('light')}>Light</Button>
  //     <Button onClick={() => setColorScheme('dark')}>Dark</Button>
  //     <Button onClick={() => setColorScheme('auto')}>Auto</Button>
  //   </Group>
  // );
}
