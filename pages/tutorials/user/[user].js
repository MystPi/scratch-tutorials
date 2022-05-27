import { Title, Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUserTutorials } from 'lib/useTutorial';
import Layout from 'components/layout';
import TutorialGroup from 'components/tutorialGroup';

export default function UserTutorials() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const user = router.query.user;
  const { tutorials, isLoading, isError } = useUserTutorials(user, page);
  let content;

  if (isLoading || isError) {
    content = <Loader />;
  } else {
    content = (
      <TutorialGroup
        tutorials={tutorials.data}
        count={tutorials.count}
        page={page}
        onPageChange={setPage}
      />
    );
  }

  return (
    <Layout title={`Tutorials by ${user}`}>
      <Title mb="xl">Tutorials by {user}</Title>
      {content}
    </Layout>
  );
}
