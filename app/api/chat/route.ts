<<<<<<< HEAD
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import OpenAI from 'openai';
=======
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
>>>>>>> ayev

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

<<<<<<< HEAD
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

// Generate Interview Scores
const b = async (transcriptionText: string) => {
  // setLoading(true);
  const openAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const messages = [
    {
      role: 'system',
      content: `
          You are a helpful assistant for a digital AI platform that helps users with interview preparation.

          Be friendly and helpful towards the user, help them navigate the website and use the features on the platform.
          The platform is called Claro.study and uses AI to generate realistic interview practice sessions with a virtual
          interviewer on whatever topic the user wants. Following the interview, the user can get a report on their performance
          with our real time analysis on their performance. We also have a resources center with articles and videos to help the user
          use the platform and with expert tips and tricks on how to ace their interview for their desired industry.
        `,
    },
    { role: 'user', content: `Here is the user's message:\n\n"""${transcriptionText}"""` },
  ];

  try {
    const response = await openAIClient.chat.completions.create({
      model: 'gpt-4o', // or 'gpt-3.5-turbo'
      messages,
      temperature: 0.7,
    });
    //   setScores(response.choices[0].message.content.trim());
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating scores:', error);
  }
};
=======
  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
  });

  return Response.json(result);
}
>>>>>>> ayev
