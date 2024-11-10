'use client';

import dynamic from 'next/dynamic';
import { Avatar, Box, Card, Flex, Paper, Text } from '@mantine/core';

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'));
const UserMessage = ({ username = 'user', content = 'content', user = true }) => {
  if (!user) {
    return (
      <Flex align="bottom" gap="xs" ml="auto" mr="0">
        <Paper style={{ borderBottomRightRadius: '0' }} shadow="xl" bg="gray.2" radius="md" p="md">
          {/* <MarkdownPreview
            source={content}
            style={{ color: 'black', background: 'transparent', wordBreak: 'break-word' }}
          /> */}
        </Paper>
        {/* <Flex mr="0" ml="auto" gap="5" align="center" w="fit-content"> */}
        <Avatar mb="0" mt="auto" />
        {/* </Flex> */}
      </Flex>
    );
  }
  return (
    <Flex align="bottom" gap="xs" mr="auto" ml="0">
      <Avatar mt="auto" mb="0" />
      <Paper style={{ borderBottomLeftRadius: '0' }} shadow="xl" bg="dark.7" radius="md" p="md">
        <MarkdownPreview
          source={content}
          style={{ color: 'white', background: 'transparent', wordBreak: 'break-word' }}
        />
      </Paper>
      {/* <Flex mt="xs" gap="5" align="center"> */}

      {/* </Flex> */}
    </Flex>
  );
};

export default UserMessage;
