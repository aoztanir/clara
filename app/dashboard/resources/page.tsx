'use client';

import { Badge, Button, Card, Group, Image, SimpleGrid, Text } from '@mantine/core';

export default function ResourcesPage() {
  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src="/images/leetcode.png" height={160} alt="LeetCode" />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>LeetCode</Text>
            <Badge color="blue">Coding Practice</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            Practice coding problems and prepare for technical interviews with LeetCode's vast
            collection of programming challenges.
          </Text>

          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            component="a"
            href="https://leetcode.com"
            target="_blank"
          >
            Start Practicing
          </Button>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src="/images/system-design.png" height={160} alt="System Design" />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>System Design Primer</Text>
            <Badge color="green">Architecture</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            Learn how to design large-scale systems. Prep for system design interviews with
            comprehensive guides and examples.
          </Text>

          <Button
            variant="light"
            color="green"
            fullWidth
            mt="md"
            radius="md"
            component="a"
            href="https://github.com/donnemartin/system-design-primer"
            target="_blank"
          >
            Learn More
          </Button>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src="/images/behavioral.png" height={160} alt="Behavioral Interview" />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Behavioral Interview Guide</Text>
            <Badge color="grape">Soft Skills</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            Master behavioral interviews with STAR method examples and common interview questions
            for software engineers.
          </Text>

          <Button
            variant="light"
            color="grape"
            fullWidth
            mt="md"
            radius="md"
            component="a"
            href="#"
            target="_blank"
          >
            View Guide
          </Button>
        </Card>
      </SimpleGrid>
    </>
  );
}
