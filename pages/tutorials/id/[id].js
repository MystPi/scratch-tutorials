import { Title, Text, Group, Button, Anchor } from '@mantine/core';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTutorial from 'lib/useTutorial';
import useUser from 'lib/useUser';
import Layout from 'components/layout';
import Markdown from 'components/markdown';
import ErrorDialog from 'components/errorDialog';
import status from 'components/status';

export default function Tutorial() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user } = useUser();
  const { tutorial, isLoading, isError } = useTutorial(router.query.id);
  const Status = status('View a Tutorial', isLoading, isError);

  if (Status) return Status;

  async function deleteTutorial() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this tutorial?'
    );

    if (!confirmed) return;

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
