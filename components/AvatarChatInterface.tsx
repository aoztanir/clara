// app/components/AvatarChat.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { AvatarQuality, StreamingEvents } from '@heygen/streaming-avatar';
import  StreamingAvatar from '@heygen/streaming-avatar'

// Type for the HeyGen token
type HeyGenToken = string & { __brand: 'HeyGenToken' };

export default function AvatarChat() {
    const [isRecording, setIsRecording] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const avatarRef = useRef<StreamingAvatar | null>(null);

    useEffect(() => {
        const token = process.env.NEXT_PUBLIC_HEYGEN_TOKEN as HeyGenToken;
        
        if (!token) {
            console.error('Missing HeyGen token');
            return;
        }

        const initAvatar = async () => {
            try {
                if (!avatarRef.current) {
                    // Create new instance with properly typed token
                    avatarRef.current = new StreamingAvatar({ token });

                    avatarRef.current.on(StreamingEvents.STREAM_READY, () => {
                        console.log('Stream ready');
                        setIsInitialized(true);
                    });

                    await avatarRef.current.createStartAvatar({
                        quality: AvatarQuality.Medium,
                        avatarName: process.env.NEXT_PUBLIC_AVATAR_ID,
                        voice: {
                            voiceId: process.env.NEXT_PUBLIC_VOICE_ID,
                            rate: 1.2,
                        }
                    });
                }
            } catch (error) {
                console.error('Initialization error:', error);
            }
        };

        initAvatar();

        return () => {
            if (avatarRef.current) {
                avatarRef.current.closeVoiceChat();
                avatarRef.current.stopAvatar();
                avatarRef.current = null;
            }
            setIsInitialized(false);
        };
    }, []);

    const toggleVoiceChat = async () => {
        if (!avatarRef.current || !isInitialized) return;

        try {
            if (!isRecording) {
                await avatarRef.current.startVoiceChat({
                    useSilencePrompt: true
                });
                setIsRecording(true);
            } else {
                await avatarRef.current.closeVoiceChat();
                setIsRecording(false);
            }
        } catch (error) {
            console.error('Voice chat error:', error);
            setIsRecording(false);
        }
    };

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
            <button onClick={toggleVoiceChat}>
                {isRecording ? 'Stop' : 'Start'} Voice Chat
            </button>
        </div>
    );
}