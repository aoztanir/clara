'use client';

import { ArrowFatUp, ArrowUp, Chat } from '@phosphor-icons/react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Image,
  ScrollArea,
  ScrollAreaAutosize,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import UserMessage from '@/components/User/UserMessage/UserMessage';
import { useChat } from 'ai/react';

export default function ResourcesPage() {
  const {
    messages,
    stop,
    setInput,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: '/api/chat',
    id: 'resourcesChat',
    initialMessages: [],
    onFinish(message) {},

    onError(error) {},
  });

  return (
    <>
      <Grid>
        <Grid.Col span={6}>
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
                Master behavioral interviews with STAR method examples and common interview
                questions for software engineers.
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
        </Grid.Col>
        <Grid.Col span={6}>
          <Card
            withBorder
            shadow="sm"
            padding="lg"
            radius="md"
            mah="90vh"
            h="90vh"
            style={{ position: 'relative' }}
          >
            <Box
              h="fit-content"
              style={{ position: 'absolute', top: 0, left: 0, zIndex: 5 }}
              bg="inherit"
              p="md"
              w="100%"
            >
              <Text fw="900" className="artsy-text" fz="h3" m="0">
                Claro AI
              </Text>
            </Box>
            <Box py="60" h="100%" style={{ maxHeight: '100%' }}>
              <ScrollArea.Autosize offsetScrollbars h="100%">
                <Stack gap="xl">
                  {messages.map((message) => (
                    <UserMessage
                      key={message.id}
                      content={message.content}
                      user={message.role === 'assistant'}
                    />
                  ))}
                </Stack>
              </ScrollArea.Autosize>
            </Box>
            <Box
              h="fit-content"
              style={{ position: 'absolute', bottom: 0, left: 0 }}
              p="md"
              w="100%"
            >
              <form onSubmit={handleSubmit}>
                <Textarea
                  // className="artsy-text"

                  value={input}
                  onChange={handleInputChange}
                  m="0"
                  w="100%"
                  variant="filled"
                  size="md"
                  autosize
                  maxRows={4}
                  leftSection={<Chat weight="fill" />}
                  rightSection={
                    <ActionIcon onClick={handleSubmit}>
                      <ArrowFatUp weight="fill" />
                    </ActionIcon>
                  }
                />
              </form>
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
