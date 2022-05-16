import { Title, Text, Anchor } from '@mantine/core';
import Link from 'next/link';
import Layout from 'components/layout';

export default function LoginFailed() {
  return (
    <Layout title="Login Failed">
      <Title>Oh no, login failed!</Title>
      <Text color="dimmed">
        This could be from a number of different reasons. Click{' '}
        <Link href="/api/auth/login" passHref>
          <Anchor>here</Anchor>
        </Link>{' '}
        to try again.
      </Text>
    </Layout>
  );
}
