import { Title, Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import { getAllTutorialsByUser } from 'lib/db';
import Layout from 'components/layout';
import TutorialGroup from 'components/tutorialGroup';

export default function UserTutorials({ user, tutorials }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout title="Loading">
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout title={`Tutorials by ${user}`}>
      <Title mb="xl">Tutorials by {user}</Title>
      <TutorialGroup tutorials={tutorials} />
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
  const tutorials = await getAllTutorialsByUser(params.user);

  if (tutorials) {
    return {
      props: {
        tutorials,
        user: params.user,
      },
      revalidate: 2,
    };
  } else {
    return {
      notFound: true,
    };
  }
}
