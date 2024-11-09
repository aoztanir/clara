// app/api/generateInterviewScores/route.ts

import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Specify Edge runtime

// Initialize OpenAI client
const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, //Where should this key be defined?
});

// Define the message format for OpenAI API
type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// Define a response type for the OpenAI API call
type OpenAIResponse = {
  choices: { message?: { content: string | null } }[];
};

// Helper function for generating interview scores
async function generateInterviewScores(transcriptionText: string): Promise<string | null> {
  try {
    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: `
You are an interviewer for a specific job the user is applying for. 
Analyze the following interview and give it a score out of 100 in each of the following categories:
- Overall
- Accuracy
- Detail
- Concision

You should give each of these scores separated by a comma and NOTHING ELSE. (Such as 98, 67, 85, etc)
        `,
      },
      {
        role: 'user',
        content: `
Here is the transcription of the interview:

"""
${transcriptionText}
"""
        `,
      },
    ];

    const response: OpenAIResponse = await openAIClient.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.7,
    });

    // Check for a valid message content
    const messageContent = response.choices[0]?.message?.content;
    return messageContent ? messageContent.trim() : null;

  } catch (error: any) {
    console.error('Error:', error.message);
    return null;
  }
}

// Helper function for generating interview report
async function generateInterviewReport(transcriptionText: string): Promise<string | null> {
  try {
    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: `
You are an interviewer for a specific job the user is applying for. 

Analyze the following interview transcription and generate a comprehensive report for the interviewee.

Make sure to format the interview response with markdown text to format it properly.

The report should include:
- General feedback on overall performance.
- Specific feedback on the following categories:
    - **Pace**
    - **Clarity**
    - **Relevance**
    - **Interpersonal Skills**
    - **Competence**

The report should then point to specific moments/questions that the user can look back to and improve on. Give specific details for each moment/question on what exactly the user could have improved on.

Please provide the report in a clear and organized format.
        `,
      },
      {
        role: 'user',
        content: `
Here is the transcription of the interview:

"""
${transcriptionText}
"""
        `,
      },
    ];

    const response: OpenAIResponse = await openAIClient.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.7,
    });

    // Check for a valid message content
    const messageContent = response.choices[0]?.message?.content;
    return messageContent ? messageContent.trim() : null;

  } catch (error: any) {
    console.error('Error:', error.message);
    return null;
  }
}

// API route handler
export async function POST(request: Request) {
  const { transcriptionText, type } = await request.json();

  // Validate input
  if (!transcriptionText || !type) {
    return NextResponse.json({ error: 'Missing transcription text or type' }, { status: 400 });
  }

  let response;

  if (type === 'score') {
    response = await generateInterviewScores(transcriptionText);
  } else if (type === 'report') {
    response = await generateInterviewReport(transcriptionText);
  } else {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  // Return the response
  return NextResponse.json({ result: response });
}
