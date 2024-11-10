'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Download } from '@phosphor-icons/react';
import { IconRefresh } from '@tabler/icons-react';
import { saveAs } from 'file-saver';
import {
  Badge,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Group,
  Loader,
  RingProgress,
  Text,
  Title,
} from '@mantine/core';
import {
  generateInterviewData,
  generateInterviewReport,
  generateInterviewScores,
} from '@/app/api/interviewReportFunctions/route';
import { useActiveLinkStore } from '@/stores/activeLinkStore';
import { createClient } from '@/utils/supabase/client';

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'));

export default function InterviewPage({ params }: { params: { id: string } }) {
  const activeLink = useActiveLinkStore((state) => state.activeLink);
  const supabase = createClient();
  const setActiveLink = useActiveLinkStore((state) => state.setActiveLink);

  const [scores, setScores] = useState<number[]>([]);
  const [report, setReport] = useState<string>('');
  const [loadingScores, setLoadingScores] = useState<boolean>(false);
  const [loadingReport, setLoadingReport] = useState<boolean>(false);

  const fetchScores = async () => {
    setLoadingScores(true);
    const scoresText = await generateInterviewScores(interview?.transcript);
    if (scoresText) {
      setScores(scoresText.split(',').map((score: string) => parseInt(score.trim())));
    }
    setLoadingScores(false);
    if (scoresText) {
      return scoresText.split(',').map((score: string) => parseInt(score.trim()));
    }
    return null;
  };

  const fetchReport = async () => {
    setLoadingReport(true);
    const reportText = await generateInterviewReport(interview?.transcript);
    if (reportText) {
      setReport(reportText);
    }
    setLoadingReport(false);
    return reportText;
  };

  const [interview, setInterview] = useState<any>(null);

  const getInterview = async () => {
    const id = (await params).id;

    const { data, error } = await supabase.from('interview').select('*').eq('id', id).maybeSingle();
    setActiveLink({ href: '/dashboard/history', label: data?.name });
    console.log(error);
    setInterview(data);

    setScores(data?.feedback_ratings);
    setReport(data?.feedback_report);

    // if (!data?.feedback_ratings || !data?.feedback_report) {
    //   handleInterviewReport();
    // }
  };
  useEffect(() => {
    getInterview();
  }, []);

  const handleDownloadReport = () => {
    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, 'Interview_Report.md');
  };
  const handleInterviewReport = async () => {
    setLoadingReport(true);
    setLoadingScores(true);
    console.log(interview);

    const { report, scores } = await generateInterviewData(interview?.transcript, interview?.id);
    setReport(report);
    setScores(scores);
    setLoadingReport(false);
    setLoadingScores(false);

    // const scoreArray = await fetchScores();
    // const reportText = await fetchReport();
    // const { data, error } = await supabase
    //   .from('interview')
    //   .update({ feedback_ratings: scoreArray, feedback_report: reportText })
    //   .eq('id', interview?.id);
  };

  return (
    <Container size="lg">
      <Button
        variant="default"
        leftSection={<ArrowLeft />}
        component={Link}
        href="/dashboard/history"
      >
        Back
      </Button>

      <Title mt="md" className="artsy-text" order={1}>
        {interview?.name}
      </Title>
      <Group gap="xs" mt="md">
        {interview?.tags?.map(({ name, color }) => (
          <Badge variant="light" tt="none" radius="sm" color={color} key={name} size="lg">
            {name}
          </Badge>
        ))}
      </Group>
      {/* <Text size="xl" fw={700} ta="center" mb="lg">
        Interview Report
      </Text> */}

      <Center style={{ justifyContent: 'space-around', marginBottom: '20px' }} mt="xl">
        {loadingScores ? (
          <Loader color="var(--mantine-color-red-7)" type="bars" />
        ) : (
          scores.map((score, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <RingProgress
                sections={[{ value: score, color: ['blue', 'red', 'teal', 'yellow']?.[index] }]}
                size={100}
                thickness={7}
                styles={{ label: { fontWeight: '900' } }}
                roundCaps
                label={`${score}`}
              />
              <Text size="sm" mt="sm" fw="900">
                {['Accuracy', 'Detail', 'Concision', 'Overall'][index]}: {score}
              </Text>
            </div>
          ))
        )}
      </Center>

      <Group mt="50px">
        <Button
          onClick={() => {
            handleInterviewReport();
          }}
          variant="default"
          rightSection={<IconRefresh size={16} />}
        >
          Regenerate Report
        </Button>
        <Button
          onClick={handleDownloadReport}
          variant="filled"
          color="indigo"
          rightSection={<Download weight="fill" size={16} />}
        >
          Download Report
        </Button>
      </Group>

      <Card shadow="xl" padding="xl" radius="md" mb="lg" withBorder mt="lg">
        <Text size="30px" fw={900} mb="xl" className="artsy-text">
          AI Interview Report
        </Text>
        <Divider mb="xl" />
        {loadingReport ? (
          <Center p="xl">
            <Loader color="var(--mantine-color-red-7)" type="bars" />
          </Center>
        ) : (
          <MarkdownPreview
            source={report}
            style={{
              color: 'var(--mantine-color-text)',
              background: 'transparent',
              wordBreak: 'break-word',
            }}
          />
        )}
      </Card>
    </Container>
  );
}

const InterviewReport = ({ transcriptionText }: { transcriptionText: string }) => {
  //   useEffect(() => {
  //     fetchScores();
  //     fetchReport();
  //   }, [transcriptionText]);

  return <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}></div>;
};
