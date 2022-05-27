import { Grid, Pagination } from '@mantine/core';
import TutorialCard from './tutorialCard';

export default function TutorialGroup({
  tutorials,
  count,
  page,
  onPageChange,
}) {
  return (
    <>
      <Pagination
        mb="xl"
        page={page}
        onChange={onPageChange}
        total={!count ? 1 : Math.ceil(count / 6)}
      />
      <Grid>
        {tutorials.map((tutorial) => (
          <Grid.Col md={4} sm={6} key={tutorial.id}>
            <TutorialCard tutorial={tutorial} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
