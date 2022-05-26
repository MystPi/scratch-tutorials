import { Title, Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import useTutorial from 'lib/useTutorial';
import Layout from 'components/layout';
import TutorialGroup from 'components/tutorialGroup';

export default function UserTutorials() {
  const router = useRouter();
  const user = router.query.user;
  const { tutorial: tutorials, isLoading, isError } = useTutorial(user, true);
  let content;

  if (isLoading || isError) {
    content = <Loader />;
  } else {
    content = <TutorialGroup tutorials={tutorials} />;
  }

  return (
    <Layout title={`Tutorials by ${user}`}>
      <Title mb="xl">Tutorials by {user}</Title>
      {content}
    </Layout>
  );
}
