import { Title, Text, Group, Button, Anchor } from '@mantine/core';
import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getTutorial } from 'lib/db';
import { withSessionSsr } from 'lib/withSession';
import Layout from 'components/layout';
import Markdown from 'components/markdown';
import ErrorDialog from 'components/errorDialog';

export default function Tutorial({ tutorial, user }) {
  const [error, setError] = useState(null);

  async function deleteTutorial() {
    const endpoint = `/api/tutorials/id/${tutorial.id}`;
    const res = await fetch(endpoint, { method: 'DELETE' });
    const json = await res.json();

    if (res.ok) {
      Router.push(`/tutorials/user/${user?.username}`);
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

export const getServerSideProps = withSessionSsr(async ({ req, params }) => {
  const tutorial = await getTutorial(params.id);

  if (tutorial) {
    return {
      props: {
        tutorial,
        user: req.session.user || null,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
});
