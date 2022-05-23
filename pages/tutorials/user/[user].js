import { Title } from '@mantine/core';
import { useRouter } from 'next/router';
import useTutorial from 'lib/useTutorial';
import Layout from 'components/layout';
import TutorialGroup from 'components/tutorialGroup';
import status from 'components/status';

export default function UserTutorials() {
  const router = useRouter();
  const user = router.query.user;
  const { tutorial: tutorials, isLoading, isError } = useTutorial(user, true);
  const Status = status(`Tutorials by a User`, isLoading, isError);

  if (Status) return Status;

  return (
    <Layout title={`Tutorials by ${user}`}>
      <Title mb="xl">Tutorials by {user}</Title>
      <TutorialGroup tutorials={tutorials} />
    </Layout>
  );
}
