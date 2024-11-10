'use client';

import Link from 'next/link';
import { HandWaving, VideoConference } from '@phosphor-icons/react';
import { IconBrain, IconMessage, IconMicrophone, IconWorld } from '@tabler/icons-react';
import {
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import Logo from '@/components/Logo/Logo';

// We're building a product to help immigrants with interviews whether it be those for visa applications or those who want to apply for jobs and might have a difficult time doing so because they don't speak native language.  I want you to build me a landing page for this. it should include a header, Landing Section with a heading and a tagline explanation of what we do along with a screenshot of the product. Next I want you to build a features section which explains how we have a AI interview persona called Clara. The app is also called clara. I want you to then make an inspiration  section that talks about the inspiration for the app, since the team are all from immigrant background or are immigrants themselves. Then last I want you to make an about section that has an image and short bio  for our four members.  Last I want a footer. Things that say anything like "get started"
//  should reroute using NextJS's link component to the /dashboard route. Additionally, I want you to use mantine for this whole thing. For headings and large text use className='artsy-text' for a cool affect.

export default function HomePage() {
  return (
    <>
      {/* Header */}
      <Container size="lg" py="md">
        <Group justify="space-between">
          <Logo />
          <Button component={Link} href="/dashboard" variant="default">
            Start Interview
          </Button>
        </Group>
      </Container>

      {/* Hero Section */}
      <Container size="xl" py={60}>
        <Grid gutter={40} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Title className="artsy-text" size={50}>
                Practice interviews with your AI companion Clara.
              </Title>
              <Text size="xl" c="dimmed">
                Breaking down language barriers in interviews. Whether you're preparing for a visa
                interview or job application, Clara helps non-native speakers build confidence
                through practice.
              </Text>
              <Button
                size="lg"
                component={Link}
                href="/dashboard"
                radius="md"
                variant="default"
                leftSection={<HandWaving size={20} weight="fill" />}
              >
                Meet Clara
              </Button>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              className="scale-on-hover"
              radius="md"
              // src="/screenshot.png"
              src="/front-page-demo.png"
              alt="Clara Interface"
              fallbackSrc="https://placehold.co/600x400?text=Clara+Interface"
            />
          </Grid.Col>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container size="lg" py={60}>
        <Stack ta="center" gap="xl">
          <Title order={2} className="artsy-text">
            Meet Clara, Your AI Interview Coach
          </Title>
          <Text size="xl" c="dimmed" maw={600} mx="auto">
            Clara is designed to be patient, understanding, and adaptable to different English
            proficiency levels
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30}>
            <Card shadow="sm" padding="lg" radius="md" withBorder className="scale-on-hover">
              <ThemeIcon size={40} radius="md" mb="md" variant="light">
                <IconMicrophone size={20} />
              </ThemeIcon>
              <Text fw={500} size="xl" mb="sm" className="artsy-text">
                Adaptive Speech Recognition
              </Text>
              <Text size="sm" c="dimmed">
                Advanced AI that understands various accents and speaking patterns and can spoeak in
                many different languages.
              </Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder className="scale-on-hover">
              <ThemeIcon size={40} radius="md" mb="md" variant="light">
                <IconBrain size={20} />
              </ThemeIcon>
              <Text fw={500} size="xl" mb="sm" className="artsy-text">
                Personalized Feedback
              </Text>
              <Text size="sm" c="dimmed">
                Get structured, constructive feedback with statistics that will help you improve
                your interview skills.
              </Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder className="scale-on-hover">
              <ThemeIcon size={40} radius="md" mb="md" variant="light">
                <IconWorld size={20} />
              </ThemeIcon>
              <Text fw={500} size="xl" mb="sm" className="artsy-text">
                Cultural Context
              </Text>
              <Text size="sm" c="dimmed">
                Learn about cultural nuances and expectations in different interview settings.
              </Text>
            </Card>
          </SimpleGrid>
        </Stack>
      </Container>

      {/* Inspiration Section */}
      <Container size="lg" py={60}>
        <Stack gap="xl">
          <Title ta="center" order={2} className="artsy-text">
            Our Story
          </Title>
          <Text size="lg" maw={800} mx="auto" ta="center">
            Born from personal experience, Clara was created by a team of 4. 2 members are team are
            immigrants who understand the challenges of navigating interviews in a new country, and
            the other two are children of immigrants. We've been there - feeling nervous about our
            accents, worried about cultural differences, and wanting to make the best impression
            possible. It's time to change that.
          </Text>
        </Stack>
      </Container>

      {/* Team Section */}
      <Container size="lg" py={60}>
        <Stack gap="xl">
          <Title ta="center" order={2} className="artsy-text" mb="xs">
            Meet Our Team
          </Title>
          <Divider />
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={30}>
            <BioCard
              avatar_url="https://media.licdn.com/dms/image/v2/D5603AQHFveHhxFAe3A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728158111638?e=1736985600&v=beta&t=zA4VjXtBa-sl4ez9xbZgYCKnzy4GkPN9G6QyocKku8w"
              name="Bruce Yu Lepeng"
              bio="Former software engineer who experienced the challenges of technical interviews as a non-native speaker."
            />

            <BioCard
              avatar_url="https://media.licdn.com/dms/image/v2/D5603AQEZKIgVrAd3qA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730755326334?e=1736985600&v=beta&t=sFuTAXJ_SfgkYqA5goSR36kdVidj4LKeGdYZeyNMLsw"
              name="Aryah Oztanir"
              bio="AI researcher with a passion for making technology accessible to everyone."
            />

            <BioCard
              avatar_url="https://media.licdn.com/dms/image/v2/D4E03AQFJ_94ZXJlhQA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1710172365750?e=1736985600&v=beta&t=xO8p2AWYVlay36td9QiLZtTO0XKXUrssf9ixmBTIR8k"
              name="Alex Yevchenko"
              bio="Former immigration consultant bringing real-world interview expertise."
            />

            <BioCard
              avatar_url="https://media.licdn.com/dms/image/v2/D5603AQHvzIxIP12Lqg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730694064119?e=1736985600&v=beta&t=L8wAJpYBo0NgwYGu2iq-n7tNo-44Mtlf-BGi8rVvtLM"
              name="Ibrahim Mohsin"
              bio="Morehead-Cain Scholar and backend developer focused on artificial intelligence and intuitive user experiences."
            />
          </SimpleGrid>
        </Stack>
      </Container>

      {/* Footer */}
      <Container size="lg" py={40}>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            © 2024 Clara. All rights reserved.
          </Text>
          <Group gap="xl">
            <Text size="sm" c="dimmed" component={Link} href="/privacy">
              Privacy Policy
            </Text>
            <Text size="sm" c="dimmed" component={Link} href="/terms">
              Terms of Service
            </Text>
            <Text size="sm" c="dimmed" component={Link} href="/contact">
              Contact
            </Text>
          </Group>
        </Group>
      </Container>
    </>
  );
}

const BioCard = ({ avatar_url, name, bio }: { avatar_url: string; name: string; bio: string }) => {
  return (
    <Card
      shadow="xl"
      padding="lg"
      radius="md"
      withBorder
      ta="center"
      radius="xl"
      className="scale-on-hover"
    >
      <Avatar className="scale-on-hover" size={180} mx="auto" mb="md" src={avatar_url} />
      <Text fw={500} size="30px" mb="0" mt="auto" className="artsy-text">
        {name}
      </Text>
      {/* 
      <Text size="sm" mt="sm">
        {bio}
      </Text> */}
    </Card>
  );
};
