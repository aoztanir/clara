import { useState, useRef } from 'react';

export default function TranscriptionComponent() {
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startTranscription = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support the Speech Recognition API.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    let finalTranscript = '';

    recognition.onstart = () => {
      setIsTranscribing(true);
      setTranscription('Listening...');
      resetSilenceTimer();
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      setTranscription(finalTranscript + interimTranscript);
      resetSilenceTimer();
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      stopTranscription();
    };

    recognition.onend = () => {
      stopTranscription();
    };

    recognition.start();
  };

  const resetSilenceTimer = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = setTimeout(() => {
      stopTranscription();
      setTranscription((prev) => prev + '\n\n[Transcription stopped due to inactivity]');
    }, 3000); // Stop transcription after 3 seconds of silence
  };

  const stopTranscription = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsTranscribing(false);
    }
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

    // Send final transcription to server for processing or storage
    await fetch('/api/saveTranscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcription }),
    });
  };

  return (
    <div>
      <button onClick={startTranscription} disabled={isTranscribing}>
        Start Transcription
      </button>
      <button onClick={stopTranscription} disabled={!isTranscribing}>
        Stop Transcription
      </button>
      <p>Transcription: {transcription}</p>
    </div>
  );
}

