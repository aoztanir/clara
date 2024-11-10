'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, Paper, Stack, Text, Title, ScrollArea, Divider } from '@mantine/core';
import { generateUserResponseTitle } from '@/app/api/generativeAI/route';
``
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

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: 0, // Changed to scroll to top
        behavior: 'smooth'
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
        console.error("Speech Recognition API not supported");
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
              setBubbleList(prev => [{ text: finalTranscript.trim(), title }, ...prev]);
              setTimeout(scrollToBottom, 100);
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
            setBubbleList(prev => [{ text: currentInterimTranscript.trim(), title }, ...prev]);
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
    await new Promise(resolve => setTimeout(resolve, 250)); // Add small delay
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
      <Title order={2}>Interview Recording</Title>
      
      <Card 
        shadow="sm" 
        padding="xl" 
        radius="md" 
        withBorder 
        w="100%" 
        maw={600}
        style={{ maxHeight: '80vh' }}
      >
        <Stack>
          <Text c={isTranscribing ? "blue" : "dimmed"} ta="center" fw="bold">
            {isTranscribing ? "Recording..." : "Waiting for speech..."}
          </Text>

          <ScrollArea 
            h={300}
            viewportRef={scrollAreaRef}
            offsetScrollbars
          >
            <Stack>
              {interimTranscript && (
                <Paper shadow="xs" p="md" withBorder>
                  <Text size="md" style={{ whiteSpace: 'pre-wrap' }}>
                    {interimTranscript}
                  </Text>
                </Paper>
              )}

              {bubbleList.map((bubble, index) => (
                <Bubble key={index} text={bubble.text} title={bubble.title} />
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      </Card>
    </Stack>
  );
}