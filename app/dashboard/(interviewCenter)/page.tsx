'use client';

import { Box, Card, Divider, Grid, ScrollArea, Stack, Text } from '@mantine/core';
import InteractiveAvatar from '@/components/AvatarChatInterface';
import StreamingEmbed from '@/components/StreamingEmbed';
import UserMessage from '@/components/User/UserMessage/UserMessage';

export default function DashboardPage() {
  return (
    <Box>
      <Grid>
        <Grid.Col span={6} style={{ position: 'relative' }}>
          <StreamingEmbed />
        </Grid.Col>

        <Grid.Col span={6}>
          <Card
            h="90vh"
            shadow="xl"
            padding="md"
            radius="lg"
            withBorder
            style={{ position: 'relative' }}
          >
            <Box
              w="100%"
              style={{ position: 'absolute', top: 0, left: 0, background: 'inherit', zIndex: 100 }}
              px="md"
              pt="md"
            >
              <Text fz="xl" fw="900">
                Transcript
              </Text>
            </Box>

            <Box style={{ overflowY: 'scroll', height: '100%' }} mt="35px">
              <Stack gap="40">
                <UserMessage
                  username="user"
                  content={`
                # Interview Evaluation Report

## General Feedback
The interviewee presented themselves very well throughout the interview. They demonstrated a strong understanding of their field, provided comprehensive responses, and maintained a professional demeanor. Their enthusiasm for the position was evident, which is a positive attribute for a consulting role. The structured approach to problem-solving and strategic thinking highlighted their competence and ability to contribute to the firm.

**Overall Score: 85/100**

---

### Specific Feedback

#### **Pace**: 
The interviewee maintained a steady pace throughout the interview. They avoided rushing through their responses, which allowed the interviewer to follow their thought process clearly. This pacing is effective in conveying a well-considered response.

#### **Clarity**: 
The interviewee communicated their ideas clearly and concisely. Their explanations, particularly in the case study, were structured and easy to understand. However, there were moments where more concise phrasing could have been employed to enhance clarity even further.

#### **Relevance**: 
The interviewee consistently provided relevant information that aligned with the questions asked. Their experiences and examples directly supported their suitability for the consulting position. However, in the case study, while the comprehensive approach was appreciated, prioritizing key strategies might have demonstrated a sharper focus.

#### **Interpersonal Skills**: 
The interviewee displayed excellent interpersonal skills, engaging naturally with the interviewer and expressing genuine interest in the role. Their ability to ask insightful questions about career progression within the firm showed their proactive approach and interest in long-term growth.

#### **Competence**: 
The interviewee demonstrated strong competence in their field, particularly in strategic management and financial analysis. Their ability to articulate a structured approach to problem-solving in the case study was impressive. However, providing more specific metrics or outcomes in past experiences could further demonstrate their impact and results-driven approach.

---

### Areas for Improvement

1. **Case Study Prioritization**:  
   - **Moment/Question**: "Suppose a mid-sized retail company is experiencing a decline in sales..."  
   - **Suggestion**: While the interviewee's approach was comprehensive, focusing on one or two key strategies and elaborating on them could have showcased a more targeted problem-solving ability. This can help in demonstrating prioritization skills in consulting scenarios.

2. **Concreteness in Past Experiences**:
   - **Moment/Question**: "Can you tell me about a time when you faced a significant challenge at work..."  
   - **Suggestion**: While the example provided was strong, including specific metrics or outcomes related to the project's success (e.g., quantifying the improvement in forecasting accuracy) would enhance the impact of the response and illustrate a results-oriented mindset.

3. **Conciseness**:
   - **Overall Observation**: Although clarity was generally good, there were areas where responses could be more concise.
   - **Suggestion**: Practice summarizing complex ideas succinctly to maintain engagement and ensure clarity without losing important details.

---
                `}
                />

                <UserMessage
                  username="user"
                  content={`
                # Interview Evaluation Report

## General Feedback
The interviewee presented themselves very well throughout the interview. They demonstrated a strong understanding of their field, provided comprehensive responses, and maintained a professional demeanor. Their enthusiasm for the position was evident, which is a positive attribute for a consulting role. The structured approach to problem-solving and strategic thinking highlighted their competence and ability to contribute to the firm.

**Overall Score: 85/100**

---

### Specific Feedback

#### **Pace**: 
The interviewee maintained a steady pace throughout the interview. They avoided rushing through their responses, which allowed the interviewer to follow their thought process clearly. This pacing is effective in conveying a well-considered response.

#### **Clarity**: 
The interviewee communicated their ideas clearly and concisely. Their explanations, particularly in the case study, were structured and easy to understand. However, there were moments where more concise phrasing could have been employed to enhance clarity even further.

#### **Relevance**: 
The interviewee consistently provided relevant information that aligned with the questions asked. Their experiences and examples directly supported their suitability for the consulting position. However, in the case study, while the comprehensive approach was appreciated, prioritizing key strategies might have demonstrated a sharper focus.

#### **Interpersonal Skills**: 
The interviewee displayed excellent interpersonal skills, engaging naturally with the interviewer and expressing genuine interest in the role. Their ability to ask insightful questions about career progression within the firm showed their proactive approach and interest in long-term growth.

#### **Competence**: 
The interviewee demonstrated strong competence in their field, particularly in strategic management and financial analysis. Their ability to articulate a structured approach to problem-solving in the case study was impressive. However, providing more specific metrics or outcomes in past experiences could further demonstrate their impact and results-driven approach.

---

### Areas for Improvement

1. **Case Study Prioritization**:  
   - **Moment/Question**: "Suppose a mid-sized retail company is experiencing a decline in sales..."  
   - **Suggestion**: While the interviewee's approach was comprehensive, focusing on one or two key strategies and elaborating on them could have showcased a more targeted problem-solving ability. This can help in demonstrating prioritization skills in consulting scenarios.

2. **Concreteness in Past Experiences**:
   - **Moment/Question**: "Can you tell me about a time when you faced a significant challenge at work..."  
   - **Suggestion**: While the example provided was strong, including specific metrics or outcomes related to the project's success (e.g., quantifying the improvement in forecasting accuracy) would enhance the impact of the response and illustrate a results-oriented mindset.

3. **Conciseness**:
   - **Overall Observation**: Although clarity was generally good, there were areas where responses could be more concise.
   - **Suggestion**: Practice summarizing complex ideas succinctly to maintain engagement and ensure clarity without losing important details.

---
                `}
                  user={false}
                />
              </Stack>
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
