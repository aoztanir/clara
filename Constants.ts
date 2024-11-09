import { AlignLeft, GearSix, Timer, VideoCamera } from '@phosphor-icons/react';

export const navbarLinks = [
  {
    label: 'Interview Center',
    icon: VideoCamera,
    color: 'var(--mantine-color-text)',
    href: '/dashboard',
  },
  {
    label: 'History',
    icon: Timer,
    color: 'var(--mantine-color-indigo-7)',
    href: '/dashboard/history',
  },
  {
    label: 'Resources',
    icon: AlignLeft,
    color: 'var(--mantine-color-orange-7)',
    href: '/dashboard/resources',
  },

  {
    label: 'Settings',
    icon: GearSix,
    color: 'var(--mantine-color-gray-5)',
    href: '/dashboard/settings',
  },
];
