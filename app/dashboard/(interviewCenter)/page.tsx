'use client';

import { useEffect, useState } from 'react';
import { Barbell } from '@phosphor-icons/react';
import {
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  List,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import InterviewHistoryCard from '@/components/InterviewHistoryCard/InterviewHistoryCard';
// use interview interface to render interview
import InterviewInteface from '@/components/InterviewInterface';
import InterviewInterface from '@/components/InterviewInterface';
import StreamingEmbed from '@/components/StreamingEmbed';
import TranscriptionComponent from '@/components/TranscriptionComponent';
import { useUser } from '@/components/User/AuthProvider';
import { createClient } from '@/utils/supabase/client';

// use interview interface to render interview

export default function DashboardPage() {
  const supabase = createClient();
  const { user } = useUser();
  const [page, setPage] = useState<'interview' | 'history'>('history');
  const [interviews, setInterviews] = useState([]);
  const getInterviews = async () => {
    const { data, error } = await supabase
      .from('interview')
      .select('*')
      .order('created_at', { ascending: false });
    setInterviews(data || []);
  };
  useEffect(() => {
    getInterviews();
  }, []);

  if (page === 'interview') {
    return (
      <>
        <Box w="100%">
          <Grid h="100%" w="100%">
            <Grid.Col span={8}>
              <InterviewInterface />
            </Grid.Col>
            <Grid.Col span={4}>
              <Box>
                <TranscriptionComponent />
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </>
    );
  }
  return (
    <Box h="100%">
      <Grid h="100%">
        <Grid.Col span={4} style={{ position: 'relative', height: '100%' }}>
          <Stack gap="lg" h="100%">
            <Text fz="xl" fw={500} className="artsy-text">
              Hi, {user?.user_metadata?.name?.split(' ')?.[0]}! I'm here to help you interview
              better.
            </Text>

            <Card
              component="button"
              shadow="xl"
              onClick={() => setPage('interview')}
              padding="xl"
              radius="md"
              withBorder
              h="80vh"
              style={{
                width: '100%',
                // aspectRatio: '1/1',
                height: '100%',
                cursor: 'pointer',
                border: '2px dashed var(--mantine-color-gray-4)',
                background: 'transparent',
              }}
            >
              <Stack justify="center" gap="md">
                <Text size="40px" fw={700}>
                  New Interview
                </Text>
                <Text c="dimmed" size="sm" ta="left">
                  Click to start practicing
                </Text>
              </Stack>
              <Box h="100%">
                <Image
                  mt="xl"
                  style={{
                    borderRadius: 'var(--mantine-radius-md)',
                    height: 'auto',
                    width: '100%',
                  }}
                  src={
                    'https://media.istockphoto.com/id/1359838986/photo/the-manager-is-reading-the-resume-and-is-interviewing-the-new-employee-negotiating-business.jpg?s=612x612&w=0&k=20&c=x6gpp9jg1zb0rJ3Xnvor4dZT8-mAGQ4XAza4y3cN_-w='
                  }
                  alt="interview"
                ></Image>
                <Stack mt="xl" gap="xs">
                  <Text fw={700} size="lg" mb={4}>
                    How it works:
                  </Text>
                  <SimpleGrid cols={2}>
                    <Card shadow="sm" padding="sm" radius="md" withBorder>
                      <Text size="sm" fw="900">
                        Step 1
                      </Text>
                      <Text size="sm">Click "New Interview" to begin your practice session</Text>
                    </Card>
                    <Card shadow="sm" padding="sm" radius="md" withBorder>
                      <Text size="sm" fw="900">
                        Step 2
                      </Text>
                      <Text size="sm">
                        Speak naturally - your responses will be transcribed in real-time using AI
                      </Text>
                    </Card>
                    <Card shadow="sm" padding="sm" radius="md" withBorder>
                      <Text size="sm" fw="900">
                        Step 3
                      </Text>
                      <Text size="sm">
                        When you're done, click "End Interview" to get instant AI feedback
                      </Text>
                    </Card>
                    <Card shadow="sm" padding="sm" radius="md" withBorder>
                      <Text size="sm" fw="900">
                        Step 4
                      </Text>
                      <Text size="sm">
                        Get a detailed report with scores, analysis, and personalized tips for
                        improvement
                      </Text>
                    </Card>
                  </SimpleGrid>
                </Stack>
              </Box>
            </Card>
          </Stack>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text fw={500} mb="sm" fz="xl" className="artsy-text">
            Previous Interviews
          </Text>
          <SimpleGrid cols={2} spacing="lg">
            {interviews?.map((interview) => (
              <InterviewHistoryCard key={interview.id} {...interview} />
            ))}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
