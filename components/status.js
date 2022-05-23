import { Title, Loader, Center } from '@mantine/core';
import Layout from 'components/layout';

export default function status(title, loading, error) {
  if (loading) {
    return (
      <Layout title={title}>
        <Center>
          <Loader />
        </Center>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title={error.status}>
        <Title align="center">
          {error.status} - {error.info.error}
        </Title>
      </Layout>
    );
  }

  return null;
}
