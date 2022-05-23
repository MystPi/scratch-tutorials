import { Title, Loader } from '@mantine/core';
import Layout from 'components/layout';

export default function status(loading, error) {
  if (loading) {
    return (
      <Layout title="Loading">
        <Loader />
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
