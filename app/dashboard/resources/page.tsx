'use client';

import { useEffect, useState } from 'react';
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
  List,
  Modal,
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
    initialMessages: [
      {
        role: 'assistant',
        content: `# Welcome to claraprep.co! 👋

Hi, I'm **Cara**, your assistant on claraprep.co – the AI platform built to help you succeed in interviews for **jobs, visas,** and **citizenship** in the U.S. 🇺🇸

Our platform offers:
- 🌐 **Multi-language support** for realistic practice with AI interviewers.
- 📈 **Personalized feedback** to improve your performance.
- 📚 A **Resource Center** with articles and videos to guide you through complex processes.

Let’s break down barriers together and get you interview-ready! 🚀  
Feel free to reach out if you need help navigating claraprep.co.`,
        id: 'hello',
      },
    ],
    onFinish(message) {},

    onError(error) {},
  });

  useEffect(() => {
    console.log('messages', messages);
  }, [messages]);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents default action
      handleSubmit(event); // Calls the submit function
    }
  };
  return (
    <>
      <Grid>
        <Grid.Col span={8}>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            <ResourceCard
              title="English Practice (Duolingo)"
              badge={{ text: 'Language', color: 'blue' }}
              imageSrc="https://yt3.googleusercontent.com/X1-thHeEEMyOFadgwobs8bPlYM53xxFbjqcPyFMPqDFkIxClabUJB0AgtSiQ-PG8km5zyG4Eww=s900-c-k-c0x00ffffff-no-rj"
              imageAlt="English Practice"
              description="Practice common interview phrases, improve pronunciation, and build confidence speaking English in professional settings."
              buttonText="Start Learning"
              buttonLink="https://www.duolingo.com/course/en/es/Learn-English"
              modalContent={{
                overview:
                  'Duolingo offers a comprehensive English learning program specifically designed for Spanish speakers preparing for professional environments. The platform uses gamification and spaced repetition to make learning engaging and effective.',
                detailedInfo:
                  "The course covers essential business English vocabulary, common interview phrases, pronunciation practice, and real-world conversation scenarios. You'll progress through increasingly challenging levels while building confidence in your English speaking abilities.",
                keyPoints: [
                  'Interactive lessons focused on professional vocabulary and phrases',
                  'Speech recognition technology for pronunciation practice',
                  'Progress tracking and performance analytics',
                  'Community features for practicing with other learners',
                  'Mobile-friendly platform for learning on-the-go',
                ],
              }}
            />

            <ResourceCard
              title="Visa Interview Guide"
              badge={{ text: 'Immigration', color: 'green' }}
              imageSrc="https://jgoldlaw.com/wp-content/uploads/Visa-Interview-Guide-Dress-Code-Tips-10-Mistakes-to-Avoid-500x333.jpg"
              imageAlt="Visa Interview Guide"
              description="Comprehensive preparation for visa interviews including common questions, required documents, and tips for success."
              buttonText="Learn More"
              buttonLink="https://travel.state.gov/content/travel/en/us-visas/visa-information-resources.html"
              modalContent={{
                overview:
                  'This comprehensive guide helps you prepare for your U.S. visa interview with confidence. Learn what to expect, how to present yourself professionally, and how to effectively communicate your intentions.',
                detailedInfo:
                  'The guide covers all aspects of the visa interview process, from documentation preparation to handling difficult questions. It includes tips from successful applicants and insights from immigration professionals.',
                keyPoints: [
                  'Complete checklist of required documents and forms',
                  'Sample questions and recommended answers',
                  'Professional dress code and etiquette guidelines',
                  'Common reasons for visa denials and how to avoid them',
                  'Post-interview procedures and next steps',
                ],
              }}
            />

            <ResourceCard
              title="Citizenship Test Prep"
              badge={{ text: 'Naturalization', color: 'orange' }}
              imageSrc="https://i.ebayimg.com/images/g/vE8AAOSw8DhkIzKB/s-l1200.jpg"
              imageAlt="Citizenship Test"
              description="Study materials for the U.S. citizenship test, including civics questions, English requirements, and interview preparation."
              buttonText="Start Preparing"
              buttonLink="https://www.uscis.gov/citizenship"
              modalContent={{
                overview:
                  'A comprehensive preparation resource for the U.S. citizenship test, covering all 100 civics questions, English language requirements, and naturalization interview procedures.',
                detailedInfo:
                  'Our study materials include audio lessons, practice tests, and interactive exercises designed to help you master both the civics and English portions of the citizenship test. The content is regularly updated to reflect the latest USCIS requirements.',
                keyPoints: [
                  'Complete set of 100 civics questions with detailed explanations',
                  'English reading and writing practice exercises',
                  'Mock interview simulations with feedback',
                  'Downloadable study guides and flashcards',
                  'Progress tracking and performance assessment tools',
                ],
              }}
            />

            <ResourceCard
              title="Cultural Training"
              badge={{ text: 'Workplace Culture', color: 'grape' }}
              imageSrc="https://eventguys.b-cdn.net/wp-content/uploads/2023/08/cultural-events-1024x574.jpg"
              imageAlt="Cultural Training"
              description="Learn about American workplace culture, business etiquette, and professional communication norms."
              buttonText="Explore Topics"
              buttonLink="#"
              modalContent={{
                overview:
                  'Gain essential insights into American workplace culture and professional norms to help you succeed in your career journey in the United States.',
                detailedInfo:
                  'This comprehensive cultural training program covers everything from day-to-day office interactions to long-term career development in the American workplace. Learn through real-world scenarios, case studies, and expert guidance.',
                keyPoints: [
                  'Understanding American business communication styles',
                  'Workplace hierarchy and relationship building',
                  'Meeting and email etiquette',
                  'Conflict resolution and feedback culture',
                  'Building professional networks and mentorship relationships',
                ],
              }}
            />

            <ResourceCard
              title="Resume Writing"
              badge={{ text: 'Job Search', color: 'red' }}
              imageAlt="Resume Writing"
              imageSrc="https://media.istockphoto.com/id/1412764569/photo/resume-and-keyboard-on-the-table-closeup.jpg?s=612x612&w=0&k=20&c=ZwTB59-CJq9yZADaO4j5cxaW9wlIUexcx4_iNjrNGXw="
              description="Learn how to create an American-style resume, highlight your skills, and present your international experience effectively."
              buttonText="Build Resume"
              buttonLink="#"
              modalContent={{
                overview:
                  'Master the art of creating compelling American-style resumes that highlight your unique skills and international experience in a way that resonates with U.S. employers.',
                detailedInfo:
                  'Our resume writing guide provides step-by-step instructions, templates, and expert tips for crafting resumes that stand out in the American job market. Learn how to effectively present your international experience and credentials.',
                keyPoints: [
                  'Understanding American resume formats and preferences',
                  'Tips for translating international experience',
                  'Action verbs and power phrases for impact',
                  'Customization strategies for different industries',
                  'ATS optimization techniques',
                ],
              }}
            />

            <ResourceCard
              title="Know Your Rights"
              badge={{ text: 'Legal', color: 'indigo' }}
              imageSrc="https://danariely.com/wp-content/uploads/2024/08/louisiana_ten_commandments_06192024_AP_AP24171685421476.jpg.webp?w=1024"
              imageAlt="Legal Rights"
              description="Essential information about workplace rights, immigration laws, and anti-discrimination protections in the United States."
              buttonText="Learn Rights"
              buttonLink="https://www.uscis.gov/working-in-the-united-states"
              modalContent={{
                overview:
                  'Understand your legal rights and protections as an immigrant worker in the United States. Stay informed about immigration laws, workplace regulations, and anti-discrimination policies.',
                detailedInfo:
                  'This comprehensive guide covers federal and state laws protecting immigrant workers, including wage and hour regulations, workplace safety standards, and anti-discrimination provisions. Learn about your rights and the resources available to help enforce them.',
                keyPoints: [
                  'Overview of immigrant worker protections',
                  'Workplace discrimination and harassment policies',
                  'Wage and hour rights',
                  'Safety and health regulations',
                  'Resources for legal assistance and reporting violations',
                ],
              }}
            />
          </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={4}>
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
                Clara AI
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
              <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
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
interface ResourceCardProps {
  title: string;
  badge: {
    text: string;
    color: string;
  };
  imageSrc: string;
  imageAlt: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  modalContent?: React.ReactNode;
}

function ResourceCard({
  title,
  badge,
  imageSrc,
  imageAlt,
  description,
  buttonText,
  buttonLink,
  modalContent,
}: ResourceCardProps) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        onClick={() => setOpened(true)}
        style={{ cursor: 'pointer' }}
      >
        <Card.Section>
          <Image src={imageSrc} height={160} alt={imageAlt} />
        </Card.Section>

        <Text fw={900} mt="md">
          {title}
        </Text>
        <Badge mt="xs" mb="md" color={badge.color} tt="none" radius="md" variant="light">
          {badge.text}
        </Badge>

        <Text size="sm" c="dimmed">
          {description}
        </Text>
        <Box pt="md" mb="0" mt="auto">
          <Button
            component="a"
            href={buttonLink}
            color="blue"
            fullWidth
            radius="md"
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            {buttonText}
          </Button>
        </Box>
      </Card>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={title}
        styles={{ title: { fontWeight: '900', fontSize: '2rem' } }}
        size="xl"
      >
        <Stack>
          <Image src={imageSrc} height={300} alt={imageAlt} />

          <Badge color={badge.color} tt="none" radius="md" variant="light" w="fit-content">
            {badge.text}
          </Badge>

          <Text size="lg" fw={500}>
            Overview
          </Text>
          <Text>{description}</Text>
          <Stack>
            <Text size="lg" fw={500}>
              Overview
            </Text>
            <Text>{modalContent.overview}</Text>

            <Text size="lg" fw={500}>
              Details
            </Text>
            <Text>{modalContent.detailedInfo}</Text>

            <Text size="lg" fw={500}>
              Key Points
            </Text>
            <List>
              {modalContent.keyPoints.map((point, index) => (
                <List.Item key={index}>{point}</List.Item>
              ))}
            </List>
          </Stack>
          <Button
            component="a"
            href={buttonLink}
            color="blue"
            fullWidth
            radius="md"
            target="_blank"
            mt="xl"
          >
            {buttonText}
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
