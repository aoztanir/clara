import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import OpenAI from 'openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  messages[messages.length - 1].content +=
    `You are a helpful assistant for a digital AI platform that helps users with interview preparation.

          Be friendly and helpful towards the user, help them navigate the website and use the features on the platform.
          The platform is called Claro.study and uses AI to generate realistic interview practice sessions with a virtual
          interviewer on whatever topic the user wants. Following the interview, the user can get a report on their performance
          with our real time analysis on their performance. We also have a resources center with articles and videos to help the user
          use the platform and with expert tips and tricks on how to ace their interview for their desired industry.`;

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages,
  });

  return result.toDataStreamResponse();
}
