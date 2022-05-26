import { Grid } from '@mantine/core';
import TutorialCard from './tutorialCard';

export default function TutorialGroup({ tutorials, sort }) {
  return (
    <Grid>
      {tutorials
        .sort((a, b) => {
          if (sort === 'new') {
            return b.id - a.id;
          } else if (sort === 'old') {
            return a.id - b.id;
          }
        })
        .map((tutorial) => (
          <Grid.Col md={4} sm={6} key={tutorial.id}>
            <TutorialCard tutorial={tutorial} />
          </Grid.Col>
        ))}
    </Grid>
  );
}
