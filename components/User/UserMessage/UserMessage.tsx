'use client';

import dynamic from 'next/dynamic';
import { Avatar, Box, Card, Flex, Paper, Text } from '@mantine/core';
import Logo from '@/components/Logo/Logo';
import { useUser } from '../AuthProvider';

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'));
const UserMessage = ({
  username = 'user',
  content = 'content',
  user = true,
  bgNormal = false,
  ...props
}) => {
  const { user: userProfile } = useUser();
  if (!user) {
    return (
      <Flex align="flex-end" gap="xs" ml="auto" mr="0" {...props}>
        <Paper
          withBorder
          style={{ borderBottomRightRadius: '0' }}
          shadow="xl"
          bg={bgNormal ? '' : 'gray.2'}
          radius="md"
          p="md"
        >
          <MarkdownPreview
            source={content}
            style={{
              color: bgNormal ? 'var(--mantine-color-text)' : 'black',
              background: 'transparent',
              wordBreak: 'break-word',
            }}
          />
        </Paper>
        {/* <Flex mr="0" ml="auto" gap="5" align="center" w="fit-content"> */}
        <Avatar mb="0" mt="auto" src={userProfile?.user_metadata?.avatar_url} />

        {/* </Flex> */}
      </Flex>
    );
  }
  return (
    <Flex align="flex-end" gap="xs" mr="auto" ml="0">
      {/* <Avatar mt="auto" mb="0" /> */}
      <Logo nameIncluded={false} />
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
