'use client';

import Link from 'next/link';
import { UsersFour } from '@phosphor-icons/react';
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';

const InterviewHistoryCard = ({
  id,
  name,
  created_at,
  tags,
  feedback_ratings,
  ...props
}: {
  id: string;
  name: string;
  created_at: string;
  feedback_ratings: string[];
  [key: string]: any;
}) => {
  const getDaysAgo = (date: string) => {
    const days = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24));
    return days === 0 ? 'Today' : `${days} days ago`;
  };
  return (
    <>
      <Card
        key={id}
        shadow="xl"
        padding="xl"
        radius="lg"
        withBorder
        component={Link}
        href={`/dashboard/history/${id}`}
        {...props}
      >
        <Text size="xs" c="dimmed">
          {getDaysAgo(created_at)}
        </Text>
        <Group mt="xs" justify="space-between" align="flex-start">
          <Stack gap="xs" style={{ flex: 1 }}>
            <Flex gap="xs" align="center">
              <Title order={3} fw="900" style={{ lineHeight: 1.2 }}>
                {name}
              </Title>
            </Flex>
            <Group gap="5">
              {tags?.map(({ name, color }) => (
                <Badge variant="light" tt="none" radius="sm" color={color} key={name}>
                  {name}
                </Badge>
              ))}
            </Group>
          </Stack>
        </Group>
        {/* {['Accuracy', 'Detail', 'Concision', 'Overall'][index]}: {score} */}

        <SimpleGrid mt="lg" cols={4}>
          {['Accuracy', 'Detail', 'Concision', 'Overall'].map((label, index) => (
            <Stack gap={4} align="center" key={label}>
              <RingProgress
                size={50}
                thickness={4}
                roundCaps
                sections={[
                  {
                    value: feedback_ratings?.[index],
                    color: ['blue', 'red', 'teal', 'yellow']?.[index],
                  },
                ]}
                label={
                  <Text ta="center" size="10" fw={700}>
                    {feedback_ratings?.[index]}%
                  </Text>
                }
              />
              <Text size="xs" fw="bold">
                {label}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>

        <Box mb="0" mt="auto" pt="xl">
          <Button variant="default" fullWidth radius="md">
            View Details
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default InterviewHistoryCard;
