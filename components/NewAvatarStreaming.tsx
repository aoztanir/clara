// app/components/AvatarStream.tsx

'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
} from '@heygen/streaming-avatar'

/**
 * Interface for component props
 */
interface AvatarStreamProps {
  apiEndpoint: string
}

/**
 * AvatarStream Component - Handles streaming avatar interactions
 */
export default function AvatarStream({ apiEndpoint }: AvatarStreamProps) {
  // Refs for maintaining instance references
  const avatarRef = useRef<StreamingAvatar | null>(null)
  const sessionDataRef = useRef<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // State management
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetches access token from the API
   */
  const fetchAccessToken = async (): Promise<string> => {
    try {
      const response = await fetch('/api/get-access-token')
      const data = await response.json()
      
      if (!data.token) {
        throw new Error('No token received')
      }
      
      return data.token
    } catch (error) {
      throw new Error('Failed to fetch access token')
    }
  }

  /**
   * Handles stream ready event
   */
  const handleStreamReady = useCallback((event: any) => {
    if (event.detail && videoRef.current) {
      videoRef.current.srcObject = event.detail
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play().catch(console.error)
      }
    }
  }, [])

  /**
   * Handles stream disconnection
   */
  const handleStreamDisconnected = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsSessionActive(false)
  }, [])

  /**
   * Initializes avatar session
   */
  const initializeAvatarSession = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const token = await fetchAccessToken()
      avatarRef.current = new StreamingAvatar({ token })

      sessionDataRef.current = await avatarRef.current.createStartAvatar({
        quality: AvatarQuality.High,
        avatarName: 'default',
      })

      avatarRef.current.on(StreamingEvents.STREAM_READY, handleStreamReady)
      avatarRef.current.on(StreamingEvents.STREAM_DISCONNECTED, handleStreamDisconnected)
      
      setIsSessionActive(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize session')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Terminates avatar session
   */
  const terminateAvatarSession = async () => {
    try {
      if (!avatarRef.current || !sessionDataRef.current) return

      await avatarRef.current.stopAvatar()
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      
      avatarRef.current = null
      sessionDataRef.current = null
      setIsSessionActive(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to terminate session')
    }
  }

  /**
   * Handles speaking functionality
   */
  const handleSpeak = async () => {
    try {
      if (!avatarRef.current || !inputText.trim()) return
      
      setIsLoading(true)
      await avatarRef.current.speak({
        text: inputText,
      })
      setInputText('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to speak')
    } finally {
      setIsLoading(false)
    }
  }

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (avatarRef.current) {
        terminateAvatarSession()
      }
    }
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Video Display */}
      <video
        ref={videoRef}
        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
        autoPlay
        playsInline
      />

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <button
            onClick={initializeAvatarSession}
            disabled={isSessionActive || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Start Session
          </button>
          <button
            onClick={terminateAvatarSession}
            disabled={!isSessionActive || isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
          >
            End Session
          </button>
        </div>

        {/* Input Section */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={!isSessionActive || isLoading}
            className="flex-1 px-4 py-2 border rounded"
            placeholder="Enter text for avatar to speak..."
          />
          <button
            onClick={handleSpeak}
            disabled={!isSessionActive || !inputText.trim() || isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
          >
            Speak
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
        </div>
      )}
    </div>
  )
}