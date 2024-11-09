'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IconBrandGoogle } from '@tabler/icons-react';
import { Button, Card, Container, Grid, Paper, Stack, Text, Title } from '@mantine/core';
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
          redirectTo: `${window.location.origin}/dashboard`,
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
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2} ta="center">
              Welcome Back
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Sign in to continue to your dashboard
            </Text>

            <Button
              variant="filled"
              color="indigo"
              leftSection={<IconBrandGoogle size={20} />}
              onClick={handleGoogleLogin}
              fullWidth
            >
              Continue with Google
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
