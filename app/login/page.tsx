'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MicrosoftOutlookLogo } from '@phosphor-icons/react';
import { IconBrandApple, IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useUser } from '@/components/User/AuthProvider';
import { createClient } from '@/utils/supabase/client';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid h="100vh" m={0} p={0} style={{ overflow: 'hidden' }}>
      <Grid.Col span={{ base: 12, md: 6 }} p={0}>
        <Paper
          h="100%"
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src="/login-illustration.svg"
            alt="Login illustration"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }} p={0}>
        {children}
      </Grid.Col>
    </Grid>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const { user } = useUser();

  useEffect(() => {
    if (user && user !== 'loading') {
      router.push('/dashboard');
    }
  }, [user]);

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo:
            process.env.NODE_ENV === 'production'
              ? `https://claraprep.co/dashboard`
              : `http://localhost:3000/dashboard`,
        },
      });
      console.log(error);

      if (error) throw error;
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  if (user === 'loading') return null;
  return (
    <Container size="xs" style={{ height: '100vh' }}>
      <Stack justify="center" style={{ height: '100%' }} gap="lg">
        <Card shadow="xl" padding="xl" radius="md" withBorder>
          <Stack gap="xl">
            <Stack gap={0}>
              <Title order={2} ta="center" className="artsy-text">
                Clara can't wait to meet you!
              </Title>
              <Text c="dimmed" size="sm" ta="center">
                Sign in to start practicing your interview skills
              </Text>
            </Stack>

            <Divider label="Continue with" labelPosition="center" />

            <Stack gap="md">
              <Button
                variant="default"
                leftSection={<IconBrandGoogle size={20} />}
                onClick={handleGoogleLogin}
                fullWidth
                size="md"
              >
                Google
              </Button>

              <Tooltip label="Coming soon!" position="right">
                <Button
                  variant="default"
                  leftSection={<IconBrandGithub size={20} />}
                  fullWidth
                  size="md"
                  disabled
                >
                  GitHub
                </Button>
              </Tooltip>

              <Tooltip label="Coming soon!" position="right">
                <Button
                  variant="default"
                  leftSection={<MicrosoftOutlookLogo size={20} />}
                  fullWidth
                  size="md"
                  disabled
                >
                  Microsoft
                </Button>
              </Tooltip>

              <Tooltip label="Coming soon!" position="right">
                <Button
                  variant="default"
                  leftSection={<IconBrandApple size={20} />}
                  fullWidth
                  size="md"
                  disabled
                >
                  Apple
                </Button>
              </Tooltip>
            </Stack>

            <Text size="xs" c="dimmed" ta="center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
