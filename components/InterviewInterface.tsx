'use client';

import { Barbell } from '@phosphor-icons/react';
import {
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  Image,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import StreamingEmbed from '@/components/StreamingEmbed';

export default function InterviewInterface() {
    return (
        <Box h='100%'>
            <Grid h='100%'>
                <Grid.Col span={6} style={{ position: 'relative', height: '100%' }}>
                    <StreamingEmbed />
                </Grid.Col>
            </Grid>
        </Box>
    )
}