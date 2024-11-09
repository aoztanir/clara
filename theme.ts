'use client';

import { Badge, Card, createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif',
  primaryColor: 'gray',
  defaultRadius: 'md',
  Card: Card.extend({
    defaultProps: {
      shadow: 'lg',
    },
  }),
  Badge: Badge.extend({
    defaultProps: {
      radius: 'sm',
      tt: 'none',
    },
  }),
  /* Put your mantine theme override here */
});
