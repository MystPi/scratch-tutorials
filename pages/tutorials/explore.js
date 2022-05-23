import { Title, Text } from '@mantine/core';
import { useAll } from 'lib/useTutorial';
import Layout from 'components/layout';
import TutorialGroup from 'components/tutorialGroup';
import status from 'components/status';

export default function Explore() {
  const { tutorials, isLoading, isError } = useAll();
  const Status = status('Explore', isLoading, isError);

  if (Status) return Status;

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
