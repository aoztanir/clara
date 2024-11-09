'use client';

import { IconBrain, IconCoin, IconMicrophone } from '@tabler/icons-react';
import {
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  return (
    <>
      <Stack>
        <Group justify="space-between" h="100%">
          {/* <Title order={2}>InterviewAI Assistant</Title> */}
          <ColorSchemeToggle props={{}} />
        </Group>

        <Container size="lg" py="xl" style={{ flex: 1 }}>
          <Stack align="center" spacing="xl">
            <Title ta="center" order={1} size="3.5rem">
              Practice Interviews with AI
            </Title>
            <Text size="xl" c="dimmed" maw={600} ta="center">
              Accessible interview preparation for everyone, regardless of speech impediments or
              budget constraints
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg" style={{ width: '100%' }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <ThemeIcon size={40} radius="md" mb="md">
                  <IconMicrophone size={20} />
                </ThemeIcon>
                <Text fw={500} size="lg" mb="sm">
                  Speech Recognition
                </Text>
                <Text size="sm" c="dimmed">
                  Advanced AI that understands and adapts to different speech patterns and
                  impediments
                </Text>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <ThemeIcon size={40} radius="md" mb="md">
                  <IconBrain size={20} />
                </ThemeIcon>
                <Text fw={500} size="lg" mb="sm">
                  Smart Feedback
                </Text>
                <Text size="sm" c="dimmed">
                  Detailed analysis of your responses with personalized improvement suggestions
                </Text>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <ThemeIcon size={40} radius="md" mb="md">
                  <IconCoin size={20} />
                </ThemeIcon>
                <Text fw={500} size="lg" mb="sm">
                  Always Free
                </Text>
                <Text size="sm" c="dimmed">
                  Quality interview preparation without the expensive coaching fees
                </Text>
              </Card>
            </SimpleGrid>

            <Button size="lg" radius="md">
              Start Practicing Now
            </Button>
          </Stack>
        </Container>
      </Stack>

      <Container size="lg" py={80}>
        <Stack gap={50}>
          {/* How It Works Section */}
          <Stack ta="center" gap="xs">
            <Title order={2}>How It Works</Title>
            <Text size="lg" c="dimmed" maw={600} mx="auto">
              Get started with InterviewAI Assistant in three simple steps
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30} mt={30}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size={30} fw={700} c="blue" mb="md">
                  01
                </Text>
                <Text fw={500} mb="sm">
                  Choose Your Focus
                </Text>
                <Text size="sm" c="dimmed">
                  Select from technical, behavioral, or system design interviews to match your
                  preparation needs
                </Text>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size={30} fw={700} c="blue" mb="md">
                  02
                </Text>
                <Text fw={500} mb="sm">
                  Practice Interview
                </Text>
                <Text size="sm" c="dimmed">
                  Engage in realistic interview scenarios with our AI interviewer that adapts to
                  your responses
                </Text>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size={30} fw={700} c="blue" mb="md">
                  03
                </Text>
                <Text fw={500} mb="sm">
                  Get Feedback
                </Text>
                <Text size="sm" c="dimmed">
                  Receive detailed feedback and actionable insights to improve your interview
                  performance
                </Text>
              </Card>
            </SimpleGrid>
          </Stack>

          {/* Key Features Section */}
          <Stack ta="center" gap="xs">
            <Title order={2}>Key Features</Title>
            <Text size="lg" c="dimmed" maw={600} mx="auto">
              Everything you need to ace your next interview
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={30} mt={30}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <ThemeIcon size={40} radius="md" mb="md">
                  <IconBrain size={20} />
                </ThemeIcon>
                <Text fw={500} mb="sm">
                  AI-Powered Questions
                </Text>
                <Text size="sm" c="dimmed">
                  Dynamic question generation based on your experience level
                </Text>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <ThemeIcon size={40} radius="md" mb="md">
                  <IconCoin size={20} />
                </ThemeIcon>
                <Text fw={500} mb="sm">
                  Progress Tracking
                </Text>
                <Text size="sm" c="dimmed">
                  Monitor your improvement over time with detailed analytics
                </Text>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <ThemeIcon size={40} radius="md" mb="md">
                  <IconBrain size={20} />
                </ThemeIcon>
                <Text fw={500} mb="sm">
                  Custom Scenarios
                </Text>
                <Text size="sm" c="dimmed">
                  Practice with industry-specific interview scenarios
                </Text>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <ThemeIcon size={40} radius="md" mb="md">
                  <IconCoin size={20} />
                </ThemeIcon>
                <Text fw={500} mb="sm">
                  Resource Library
                </Text>
                <Text size="sm" c="dimmed">
                  Access to comprehensive interview preparation materials
                </Text>
              </Card>
            </SimpleGrid>
          </Stack>

          {/* Testimonials Section */}
          <Stack ta="center" gap="xs">
            <Title order={2}>What Users Say</Title>
            <Text size="lg" c="dimmed" maw={600} mx="auto">
              Success stories from our community
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30} mt={30}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size="sm" c="dimmed" mb="lg" style={{ fontStyle: 'italic' }}>
                  "InterviewAI Assistant helped me land my dream job at a top tech company. The
                  realistic practice scenarios made all the difference."
                </Text>
                <Text fw={500}>Sarah Chen</Text>
                <Text size="sm" c="dimmed">
                  Software Engineer at Google
                </Text>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size="sm" c="dimmed" mb="lg" style={{ fontStyle: 'italic' }}>
                  "The feedback system is incredible. It helped me identify and improve my weak
                  points before the actual interview."
                </Text>
                <Text fw={500}>Michael Rodriguez</Text>
                <Text size="sm" c="dimmed">
                  Full Stack Developer at Meta
                </Text>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size="sm" c="dimmed" mb="lg" style={{ fontStyle: 'italic' }}>
                  "As a self-taught developer, this platform gave me the confidence I needed to
                  succeed in technical interviews."
                </Text>
                <Text fw={500}>Emily Johnson</Text>
                <Text size="sm" c="dimmed">
                  Frontend Engineer at Amazon
                </Text>
              </Card>
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
