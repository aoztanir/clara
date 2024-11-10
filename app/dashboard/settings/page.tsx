'use client';

import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
  PasswordInput,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { useUser } from '@/components/User/AuthProvider';
import { createClient } from '@/utils/supabase/client';

export default function SettingsPage() {
  const { user } = useUser();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.name || '',
    email: user?.email || '',
    timezone: user?.user_metadata?.timezone || 'America/New_York',
    email_notifications: user?.user_metadata?.email_notifications || true,
    browser_notifications: user?.user_metadata?.browser_notifications || true,
    sms_notifications: user?.user_metadata?.sms_notifications || false,
    two_factor_enabled: user?.user_metadata?.two_factor_enabled || false,
  });

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);

      // Update auth user metadata
      const { data: authUpdate, error: authError } = await supabase.auth.updateUser({
        data: {
          name: formData.full_name,
          timezone: formData.timezone,
          email_notifications: formData.email_notifications,
          browser_notifications: formData.browser_notifications,
          sms_notifications: formData.sms_notifications,
          two_factor_enabled: formData.two_factor_enabled,
        },
      });

      if (authError) throw authError;

      // Update profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          timezone: formData.timezone,
          email_notifications: formData.email_notifications,
          browser_notifications: formData.browser_notifications,
          sms_notifications: formData.sms_notifications,
          two_factor_enabled: formData.two_factor_enabled,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);

      if (profileError) throw profileError;
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.from('profiles').delete().eq('id', user?.id);

      if (error) throw error;

      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p="xl">
      <Text size="xl" fw={700} mb="lg" className="artsy-text">
        Account Settings
      </Text>

      <SimpleGrid cols={2} spacing="lg">
        <Card withBorder shadow="sm" p="lg">
          <Text fw={600} mb="md">
            Profile Information
          </Text>

          <Stack>
            <Group>
              <Avatar size="xl" radius="xl" src={user?.user_metadata?.avatar_url} />
              <Button variant="light">Change Avatar</Button>
            </Group>

            <TextInput
              label="Full Name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            />

            <TextInput label="Email" value={formData.email} disabled />

            <Select
              label="Time Zone"
              placeholder="Select timezone"
              value={formData.timezone}
              onChange={(value) =>
                setFormData({ ...formData, timezone: value || 'America/New_York' })
              }
              data={[
                { value: 'America/New_York', label: 'Eastern Time (ET)' },
                { value: 'America/Chicago', label: 'Central Time (CT)' },
                { value: 'America/Denver', label: 'Mountain Time (MT)' },
                { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
              ]}
            />

            <Button onClick={handleUpdateProfile} loading={loading}>
              Save Changes
            </Button>
          </Stack>
        </Card>

        <Card withBorder shadow="sm" p="lg">
          <Text fw={600} mb="md">
            Security Settings
          </Text>

          <Stack>
            <PasswordInput label="Current Password" placeholder="Enter current password" />

            <PasswordInput label="New Password" placeholder="Enter new password" />

            <PasswordInput label="Confirm New Password" placeholder="Confirm new password" />

            <Divider my="md" />

            <Text fw={500} mb="xs">
              Two-Factor Authentication
            </Text>
            <Switch
              label="Enable 2FA"
              description="Add an extra layer of security to your account"
              checked={formData.two_factor_enabled}
              onChange={(e) =>
                setFormData({ ...formData, two_factor_enabled: e.currentTarget.checked })
              }
            />

            <Divider my="md" />

            <Text fw={500} mb="xs">
              Notifications
            </Text>
            <Stack gap="xs">
              <Switch
                label="Email notifications"
                checked={formData.email_notifications}
                onChange={(e) =>
                  setFormData({ ...formData, email_notifications: e.currentTarget.checked })
                }
              />
              <Switch
                label="Browser notifications"
                checked={formData.browser_notifications}
                onChange={(e) =>
                  setFormData({ ...formData, browser_notifications: e.currentTarget.checked })
                }
              />
              <Switch
                label="SMS notifications"
                checked={formData.sms_notifications}
                onChange={(e) =>
                  setFormData({ ...formData, sms_notifications: e.currentTarget.checked })
                }
              />
            </Stack>

            <Button
              color="red"
              variant="light"
              mt="md"
              loading={loading}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </Stack>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
