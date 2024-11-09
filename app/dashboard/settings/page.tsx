'use client';

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

export default function SettingsPage() {
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
              <Avatar
                size="xl"
                radius="xl"
                src="https://media.istockphoto.com/id/1359838986/photo/the-manager-is-reading-the-resume-and-is-interviewing-the-new-employee-negotiating-business.jpg?s=612x612&w=0&k=20&c=x6gpp9jg1zb0rJ3Xnvor4dZT8-mAGQ4XAza4y3cN_-w="
              />
              <Button variant="light">Change Avatar</Button>
            </Group>

            <TextInput label="Full Name" placeholder="John Doe" defaultValue="John Doe" />

            <TextInput
              label="Email"
              placeholder="john@example.com"
              defaultValue="john@example.com"
            />

            <Select
              label="Time Zone"
              placeholder="Select timezone"
              defaultValue="America/New_York"
              data={[
                { value: 'America/New_York', label: 'Eastern Time (ET)' },
                { value: 'America/Chicago', label: 'Central Time (CT)' },
                { value: 'America/Denver', label: 'Mountain Time (MT)' },
                { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
              ]}
            />

            <Button>Save Changes</Button>
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
            />

            <Divider my="md" />

            <Text fw={500} mb="xs">
              Notifications
            </Text>
            <Stack gap="xs">
              <Switch label="Email notifications" defaultChecked />
              <Switch label="Browser notifications" defaultChecked />
              <Switch label="SMS notifications" />
            </Stack>

            <Button color="red" variant="light" mt="md">
              Delete Account
            </Button>
          </Stack>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
