import { Title, Group, Button, TextInput, Textarea } from '@mantine/core';
import { useState } from 'react';
import Router from 'next/router';
import { withSessionSsr } from 'lib/withSession';
import { getTutorial } from 'lib/db';
import Markdown from 'components/markdown';
import Layout from 'components/layout';
import ErrorDialog from 'components/errorDialog';

export default function Create({ editing }) {
  const [name, setName] = useState(
    editing !== false ? editing.title : 'My awesome tutorial'
  );
  const [body, setBody] = useState(
    editing !== false
      ? editing.contents
      : 'Write your **awesome** *tutorial* here!'
  );
  const [error, setError] = useState(null);

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
      Router.push(`/tutorials/id/${json.id}`);
    } else {
      setError(json.error);
    }
  }

  return (
    <Layout title="Editor">
      <Group position="apart">
        <Title>
          {editing !== false
            ? `Edit tutorial #${editing.id}`
            : 'Create a new tutorial'}
        </Title>
        <Button onClick={() => handleSubmit(name, body)}>Submit</Button>
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

export const getServerSideProps = withSessionSsr(async ({ req, query }) => {
  if (req.session.user) {
    const id = query.id;
    let editing = false;

    if (id) {
      const tutorial = await getTutorial(id);
      if (tutorial && tutorial.by === req.session.user.username) {
        editing = tutorial;
      }
    }

    return {
      props: {
        editing,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    };
  }
});
