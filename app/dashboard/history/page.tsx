import Link from 'next/link';
import { UsersFour } from '@phosphor-icons/react/dist/ssr';
import { Box, Button, Card, Flex, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import InterviewHistoryCard from '@/components/InterviewHistoryCard/InterviewHistoryCard';
import { createClient } from '@/utils/supabase/server';

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('interview').select('*');

  return (
    <Box>
      <Title className="artsy-text" mb="lg">
        Past Interviews
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {data?.map((interview) => <InterviewHistoryCard key={interview.id} {...interview} />)}
      </SimpleGrid>
    </Box>
  );
}
