// app/api/saveTranscription/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Use Edge runtime for low-latency responses

export async function POST(request: Request) {
  try {
    const { transcription } = await request.json();

    if (!transcription) {
      return NextResponse.json({ error: 'No transcription data provided' }, { status: 400 });
    }

    // Save or process the transcription (for demonstration, we log it)
    console.log('Received transcription:', transcription);

    // In a real-world application, save to a database or perform further processing here
    return NextResponse.json({ message: 'Transcription saved successfully' });
  } catch (error) {
    console.error('Error saving transcription:', error);
    return NextResponse.json({ error: 'Failed to save transcription' }, { status: 500 });
  }
}
