import { Title, Text } from '@mantine/core';
import Layout from 'components/layout';

export default function NotFound() {
  return (
    <Layout title="Not Found">
      <Title align="center">404 - Not Found</Title>
      <Text align="center" color="dimmed">
        The page you were looking for could not be found.
      </Text>
    </Layout>
  );
}
