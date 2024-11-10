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
          interviewer specifically tailored towards helping new immigrants to the United States to prepare for Visa, citizenships
          , and general job interviews. It has accessibility to a wide selection of languages and is specifically trained to guide
          new immigrants through complex interview processes while tearing down barriers to entry with language for those who are new to the country.

          The app features a resources center with articles and videos to help the user, specifically trained virtual AI interviewers
          with abilities for different languages, and personalized feedback on their interview performance.
`;

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages,
  });

  return result.toDataStreamResponse();
}
