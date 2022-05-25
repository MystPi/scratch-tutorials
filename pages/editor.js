import {
  Title,
  Text,
  Anchor,
  Group,
  Button,
  TextInput,
  Textarea,
  Skeleton,
  Modal,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useTutorial from 'lib/useTutorial';
import useUser from 'lib/useUser';
import Markdown from 'components/markdown';
import Layout from 'components/layout';
import ErrorDialog from 'components/errorDialog';

export default function Create() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser({
    redirectTo: '/api/auth/login',
  });
  const { tutorial } = useTutorial(router.query.id);
  const [editing, setEditing] = useState(false);
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState('My awesome tutorial');
  const [body, setBody] = useState('Write your **awesome** *tutorial* here!');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && tutorial && (user.username === tutorial.by || user.isMod)) {
      setEditing(tutorial);
      setName(tutorial.title);
      setBody(tutorial.contents);
    }
  }, [user, tutorial]);

  if (isUserLoading) {
    return (
      <Layout title="Editor">
        <Skeleton width="100%" height="350px" />
      </Layout>
    );
  }

  async function handleSubmit(title, contents) {
    const endpoint =
      editing === false
        ? '/api/tutorials/create'
        : `/api/tutorials/id/${editing.id}`;
    const res = await fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify({ title, contents }),
    });
    const json = await res.json();

    if (res.ok) {
      router.push(`/tutorials/id/${json.id}`);
    } else {
      setError(json.error);
    }
  }

  return (
    <Layout title="Editor">
      <Modal title="Heads up:" opened={opened} onClose={() => setOpened(false)}>
        <Text>
          To keep Scratch Tutorials a safe place for everyone, please read the{' '}
          <Anchor href="/guidelines" target="_blank">
            guidelines
          </Anchor>{' '}
          before submitting your tutorial! Any tutorials not following them will
          be removed or edited by{' '}
          <Anchor href="/mods" target="_blank">
            moderators
          </Anchor>
          .
        </Text>
        <Button mt="md" onClick={() => handleSubmit(name, body)}>
          I understand; {editing ? 'edit' : 'submit'} this tutorial
        </Button>
      </Modal>
      <Group position="apart">
        <Title>
          {editing !== false
            ? `Edit tutorial #${editing.id}`
            : 'Create a new tutorial'}
        </Title>
        <Button onClick={() => setOpened(true)}>Submit</Button>
      </Group>
      <TextInput
        mt="xl"
        size="md"
        placeholder="Enter a name for your tutorial"
        label="Tutorial name"
        required
        error={name === ''}
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <Textarea
        mt="xl"
        size="md"
        placeholder="Enter some markdown..."
        label="Tutorial (Markdown enabled)"
        required
        autosize
        error={body === ''}
        minRows={4}
        value={body}
        onChange={(event) => setBody(event.currentTarget.value)}
      />
      <Markdown value={body} />
      <ErrorDialog error={error} />
    </Layout>
  );
}
