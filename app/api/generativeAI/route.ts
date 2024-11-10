'use server';
import OpenAI from "openai";

  export const getAllMetrics = async(transcriptionText: string) => {
    const title = await generateTranscriptionTitle(transcriptionText)
    const scores = await generateInterviewScores(transcriptionText)
    const report = await generateInterviewReport(transcriptionText)
    const tags = await generateTranscriptionTags(transcriptionText)
  }

  // Generate Interview Scores
  export const generateInterviewScores = async (transcriptionText: string) => {
    // setLoading(true);
    const openAIClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const messages = [
      {
        role: 'system',
        content: `
          You are an interviewer for a specific job. Analyze the following interview and give it a score out of 100 in each of the following categories:
          Overall, Accuracy, Detail, Concision.
          Format scores as: 98, 67, 85, 92 (no extra text).
        `,
      },
      { role: 'user', content: `Here is the transcription:\n\n"""${transcriptionText}"""` },
    ];

    try {
      const response = await openAIClient.chat.completions.create({
        model: 'gpt-4o', // or 'gpt-3.5-turbo'
        messages,
        temperature: 0.7,
      });
    //   setScores(response.choices[0].message.content.trim());
    return response.choices[0].message.content.trim()
    } catch (error) {
      console.error('Error generating scores:', error);
    } finally {
    //   setLoading(false);
    }
  };

  // Generate Interview Scores
  export const generateTranscriptionTitle = async (transcriptionText: string) => {
    // setLoading(true);
    const openAIClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const messages = [
      {
        role: 'system',
        content: `
          You are being given a transcription of an interview. Your job is to generate a title for the interview.
          Generate a short and descriptive title (no more than 7 words) that would be appropriate to describe the content of the interview.

          Capitalize the first letter of each significant word in the title. Here is an example: (Interview on the American Dream).

          Also add an emoji to the left of the title to represent the content of the interview as well.

          Generate NOTHING else other than the title.
        `,
      },
      { role: 'user', content: `Here is the transcription:\n\n"""${transcriptionText}"""` },
    ];

    try {
      const response = await openAIClient.chat.completions.create({
        model: 'gpt-4o', // or 'gpt-3.5-turbo'
        messages,
        temperature: 0.7,
      });
      
      return response.choices[0].message.content.trim()
      
    } catch (error) {
      console.error('Error generating scores:', error);
    }
  };

  export const generateTranscriptionTags = async (transcriptionText: string) => {
    // setLoading(true);
    const openAIClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const messages = [
      {
        role: 'system',
        content: `
          You are being given a transcription of an interview. Your job is to generate unique tags that would be appropriate to describe the content of the interview.
          
          These tags should be no more than two words each and should be in a one line output with a comma separating each tag. (example: History, Politics, American Dream)

          Generate NOTHING else other than the tags line.
        `,
      },
      { role: 'user', content: `Here is the transcription:\n\n"""${transcriptionText}"""` },
    ];

    try {
      const response = await openAIClient.chat.completions.create({
        model: 'gpt-4o', // or 'gpt-3.5-turbo'
        messages,
        temperature: 0.7,
      });
      
      const colors = ['red', 'yellow', 'orange', 'blue', 'teal', 'indigo', 'gray'];
      const tags = response.choices[0].message.content.trim().split(', ');
      const uniqueTags = Array.from(new Set(tags));
      
      return uniqueTags.map(tag => ({
        name: tag,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      
    } catch (error) {
      console.error('Error generating tags:', error);
    }
  };


  // Generate Interview Scores
  export const generateUserResponseTitle = async (bubbleText: string) => {
    // setLoading(true);
    const openAIClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const messages = [
      {
        role: 'system',
        content: `
          You are going to be given a user's response to a question. Your job is to generate a short and descriptive title summary for the user's response.

          This title should be based off of some inference of what question the user was trying to answer with their response. 

          Generate NOTHING else other than the title.
        `,
      },
      { role: 'user', content: `Here is the user's response:\n\n"""${bubbleText}"""` },
    ];

    try {
      const response = await openAIClient.chat.completions.create({
        model: 'gpt-4o', // or 'gpt-3.5-turbo'
        messages,
        temperature: 0.7,
      });
    //   setScores(response.choices[0].message.content.trim());
    return response.choices[0].message.content.trim()
    
    } catch (error) {
      console.error('Error generating scores:', error);
    } finally {
    //   setLoading(false);
    }
  };

  // Generate Interview Report
  export const generateInterviewReport = async (transcriptionText: string) => {
    // setLoading(true);
    const openAIClient = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const messages = [
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
      { role: 'user', content: `Here is the transcription:\n\n"""${transcriptionText}"""` },
    ];
    try {
      const response = await openAIClient.chat.completions.create({
        model: 'gpt-4o', // or 'gpt-3.5-turbo'
        messages,
        temperature: 0.7,
      });
      
      return response.choices[0].message.content.trim()
      


    }
    catch (error) {
      console.error('Error generating report:', error);
    }
    
  };