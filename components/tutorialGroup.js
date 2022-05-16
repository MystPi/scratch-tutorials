import { Grid } from '@mantine/core';
import TutorialCard from './tutorialCard';

export default function TutorialGroup({ tutorials }) {
  return (
    <Grid>
      {tutorials
        .sort((a, b) => b.id - a.id)
        .map((tutorial) => (
          <Grid.Col md={4} sm={6} key={tutorial.id}>
            <TutorialCard tutorial={tutorial} />
          </Grid.Col>
        ))}
    </Grid>
  );
}
