import { Title } from '@mantine/core';
import { getAllTutorialsByUser } from 'lib/db';
import Layout from 'components/layout';
import TutorialGroup from 'components/tutorialGroup';

export default function UserTutorials({ user, tutorials }) {
  return (
    <Layout title={`Tutorials by ${user}`}>
      <Title mb="xl">Tutorials by {user}</Title>
      <TutorialGroup tutorials={tutorials} />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const tutorials = await getAllTutorialsByUser(params.user);

  if (tutorials) {
    return {
      props: {
        tutorials,
        user: params.user,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
