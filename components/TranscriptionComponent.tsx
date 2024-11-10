'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Card, Divider, Paper, ScrollArea, Stack, Text, Title } from '@mantine/core';
import { generateUserResponseTitle } from '@/app/api/generativeAI/route';
import { generateInterviewData } from '@/app/api/interviewReportFunctions/route';
import UserMessage from './User/UserMessage/UserMessage';

``;
const Bubble = ({ text, title }: { text: string; title: string }) => (
  <Stack>
    <Text size="md" fw="bold" mb="sm">
      {title}
    </Text>
    <Paper shadow="xs" p="md" withBorder mb="sm">
      <Text size="md" style={{ whiteSpace: 'pre-wrap' }}>
        {text}
      </Text>
    </Paper>
    <Divider my="sm" />
  </Stack>
);

export default function TranscriptionComponent() {
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [bubbleList, setBubbleList] = useState<Array<{ text: string; title: string }>>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isStartingRef = useRef(false); // New ref to track starting state
  const [totalTranscript, setTotalTranscript] = useState('');

  useEffect(() => {
    console.log(totalTranscript);
  }, [totalTranscript]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: 0, // Changed to scroll to top
        behavior: 'smooth',
      });
    }
  };

  const stopTranscription = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
      recognitionRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    setIsTranscribing(false);
    setInterimTranscript('');
    isStartingRef.current = false;
  };

  const [endLoading, setEndLoading] = useState(false);
  const endInterview = async () => {
    setEndLoading(true);
    const { id } = await generateInterviewData(totalTranscript);
    router.push('/dashboard/history/' + id);
    setEndLoading(false);
  };

  const router = useRouter();

  const startTranscription = async () => {
    // Prevent multiple simultaneous starts
    if (isStartingRef.current || recognitionRef.current) {
      return;
    }

    try {
      isStartingRef.current = true;
      // @ts-ignore - SpeechRecognition is not in the types
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error('Speech Recognition API not supported');
        return;
      }

      // Clean up any existing instance
      stopTranscription();

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onstart = () => {
        setIsTranscribing(true);
        isStartingRef.current = false;
      };

      recognition.onresult = async (event: any) => {
        let finalTranscript = '';
        let currentInterimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            if (finalTranscript.trim()) {
              const title = await generateUserResponseTitle(finalTranscript.trim());
              setBubbleList((prev) => [{ text: finalTranscript.trim(), title }, ...prev]);
              setTimeout(scrollToBottom, 100);
              setTotalTranscript((prev) => `${prev}\n\n${finalTranscript.trim()}`);
            }
          } else {
            currentInterimTranscript += transcript;
          }
        }

        setInterimTranscript(currentInterimTranscript);

        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }
        silenceTimerRef.current = setTimeout(async () => {
          if (currentInterimTranscript.trim()) {
            const title = await generateUserResponseTitle(currentInterimTranscript.trim());
            setBubbleList((prev) => [{ text: currentInterimTranscript.trim(), title }, ...prev]);
            setInterimTranscript('');
            setTimeout(scrollToBottom, 100);
          }
        }, 3000);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        isStartingRef.current = false;
        if (event.error === 'no-speech') {
          setTimeout(restartRecognition, 3000);
        }
      };

      recognition.onend = () => {
        isStartingRef.current = false;
        if (isTranscribing) {
          setTimeout(restartRecognition, 3000);
        }
      };

      await recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      isStartingRef.current = false;
      stopTranscription();
    }
  };

  const restartRecognition = async () => {
    if (isStartingRef.current) return;

    stopTranscription();
    await new Promise((resolve) => setTimeout(resolve, 250)); // Add small delay
    startTranscription();
  };

  useEffect(() => {
    startTranscription();

    return () => {
      stopTranscription();
    };
  }, []);

  return (
    <Stack align="center">
      <Title order={2} className="artsy-text">
        Interview Transcript
      </Title>

      <Card shadow="sm" radius="md" withBorder w="100%" h="70vh" style={{ position: 'relative' }}>
        <Stack>
          <Box
            h="100%"
            style={{ overflowY: 'scroll', position: 'absolute', top: 0, left: 0, right: 0 }}
            px="lg"
            pb="lg"
          >
            <Box my="lg" w="100%">
              <Text c="dimmed" ta="center" fw="normal">
                {isTranscribing ? 'Recording...' : 'Waiting for speech...'}
              </Text>
            </Box>
            {/* <ScrollArea.Autosize h="100%" viewportRef={scrollAreaRef} offsetScrollbars> */}

            <Stack>
              {interimTranscript && (
                <Paper shadow="xl" p="md" withBorder>
                  <Text size="md" style={{ whiteSpace: 'pre-wrap' }}>
                    {interimTranscript}
                  </Text>
                </Paper>
              )}
              <Stack gap="xl">
                {bubbleList.map((bubble, index) => (
                  <>
                    <UserMessage
                      bgNormal
                      key={index}
                      content={`### ${bubble.title} \n\n${bubble.text}`}
                      user={false}
                    />
                  </>
                ))}
              </Stack>
            </Stack>
            {/* </ScrollArea.Autosize> */}
          </Box>
        </Stack>
      </Card>
      <Button
        fullWidth
        variant="light"
        color="red"
        onClick={() => endInterview()}
        loading={endLoading}
      >
        End Interview
      </Button>
    </Stack>
  );
}
