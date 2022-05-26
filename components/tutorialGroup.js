import { Grid, Pagination } from '@mantine/core';
import { useState } from 'react';
import TutorialCard from './tutorialCard';

export default function TutorialGroup({ tutorials, sort }) {
  const [page, setPage] = useState(1);

  return (
    <>
      <Pagination
        mb="xl"
        page={page}
        onChange={setPage}
        total={Math.ceil(tutorials.length / 6)}
      />
      <Grid>
        {tutorials
          .sort((a, b) => {
            if (sort === 'new') {
              return b.id - a.id;
            } else if (sort === 'old') {
              return a.id - b.id;
            }
          })
          .slice((page - 1) * 6, page * 6)
          .map((tutorial) => (
            <Grid.Col md={4} sm={6} key={tutorial.id}>
              <TutorialCard tutorial={tutorial} />
            </Grid.Col>
          ))}
      </Grid>
    </>
  );
}
