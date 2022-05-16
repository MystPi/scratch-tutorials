import { Title, Text } from '@mantine/core';
import { getAllTutorials } from 'lib/db';
import Layout from 'components/layout';
import TutorialGroup from 'components/tutorialGroup';

export default function Explore({ tutorials }) {
  return (
    <Layout tab="explore" title="Explore">
      <Title>Explore</Title>
      <Text color="dimmed" mb="xl">
        Find new and exciting tutorials!
      </Text>
      <TutorialGroup tutorials={tutorials} />
    </Layout>
  );
}

export async function getStaticProps() {
  const tutorials = await getAllTutorials();

  return {
    props: {
      tutorials,
    },
    revalidate: 2,
  };
}
