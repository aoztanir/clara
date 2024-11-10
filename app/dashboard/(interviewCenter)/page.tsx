'use client';

import { useEffect, useState } from 'react';
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
import InterviewHistoryCard from '@/components/InterviewHistoryCard/InterviewHistoryCard';
// use interview interface to render interview
import InterviewInteface from '@/components/InterviewInterface';
import StreamingEmbed from '@/components/StreamingEmbed';
import { useUser } from '@/components/User/AuthProvider';
import { createClient } from '@/utils/supabase/client';

export default function DashboardPage() {
  const { user } = useUser();
  const supabase = createClient();
  const [interviews, setInterviews] = useState([]);
  const getInterviews = async () => {
    const { data, error } = await supabase.from('interview').select('*');
    setInterviews(data || []);
  };

  useEffect(() => {
    getInterviews();
  }, []);

  return (
    <Box h="100%">
      <Grid h="100%">
        <Grid.Col span={4} style={{ position: 'relative', height: '100%' }}>
          <Stack gap="lg" h="100%">
            <Card withBorder shadow="xl" padding="xl" radius="md">
              <Text fz="30" fw={500} className="artsy-text">
                Hi, {user?.user_metadata?.name?.split(' ')?.[0]}! I'm here to help you interview
                better.
              </Text>
            </Card>

            <Card
              component="button"
              shadow="xl"
              padding="xl"
              radius="md"
              withBorder
              style={{
                width: '100%',
                // aspectRatio: '1/1',
                height: '70vh',
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
              </Box>
            </Card>
          </Stack>
        </Grid.Col>

        <Grid.Col span={8}>
          <Text fw={500} mb="sm" fz="xl" className="artsy-text">
            Past Interviews
          </Text>
          <SimpleGrid cols={2}>
            {interviews?.map((interview) => (
              <InterviewHistoryCard key={interview.id} {...interview} />
            ))}
          </SimpleGrid>
          {/* <Card
            h="90vh"
            shadow="xl"
            padding="md"
            radius="lg"
            withBorder
            style={{ position: 'relative' }}
          >
            <Box
              w="100%"
              style={{ position: 'absolute', top: 0, left: 0, background: 'inherit', zIndex: 100 }}
              px="md"
              pt="xs"
            >
              <Text fz="xl" fw="900" className="artsy-text">
                Transcript
              </Text>
            </Box>

            <Box style={{ overflowY: 'scroll', height: '100%' }} mt="35px">
              <Stack gap="40">
                <UserMessage username="user" />
              </Stack>
            </Box>
          </Card> */}
        </Grid.Col>
      </Grid>
    </Box>
  );
}
