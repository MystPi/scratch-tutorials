import { Title, Text, Group, Button, Anchor, Loader } from '@mantine/core';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useUser from 'lib/useUser';
import { getTutorial } from 'lib/db';
import Layout from 'components/layout';
import Markdown from 'components/markdown';
import ErrorDialog from 'components/errorDialog';

export default function Tutorial({ tutorial }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user } = useUser();

  if (router.isFallback) {
    return (
      <Layout title="Loading">
        <Loader />
      </Layout>
    );
  }

  async function deleteTutorial() {
    const endpoint = `/api/tutorials/id/${tutorial.id}`;
    const res = await fetch(endpoint, { method: 'DELETE' });
    const json = await res.json();

    if (res.ok) {
      router.push(`/tutorials/user/${user?.username}`);
    } else {
      setError(json.error);
    }
  }

  return (
    <Layout title={tutorial.title}>
      <Group>
        <Title mr="auto">{tutorial.title}</Title>
        {tutorial.by === user?.username && (
          <>
            <Link href={`/editor?id=${tutorial.id}`} passHref>
              <Button component="a" variant="light">
                Edit
              </Button>
            </Link>
            <Button onClick={deleteTutorial} variant="light" color="red">
              Delete
            </Button>
          </>
        )}
      </Group>
      <Text color="dimmed" mb="xl" mt="xs">
        By{' '}
        <Link href={`/tutorials/user/${tutorial.by}`} passHref>
          <Anchor>{tutorial.by}</Anchor>
        </Link>
      </Text>
      <Markdown value={tutorial.contents} />
      <ErrorDialog error={error} />
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const tutorial = await getTutorial(params.id);

  if (tutorial) {
    return {
      props: {
        tutorial,
      },
      revalidate: 2,
    };
  } else {
    return {
      notFound: true,
    };
  }
}
