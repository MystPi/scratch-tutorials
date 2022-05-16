import { Button, Title, Text, Group, Grid } from '@mantine/core';
import Link from 'next/link';
import Layout from 'components/layout';

export default function Home() {
  return (
    <Layout tab="home">
      <Title>Scratch Tutorials</Title>
      <Text color="dimmed">
        Share your knowledge or learn something new with Scratchers worldwide
      </Text>
      <Group mt="md">
        <Link href="/editor" passHref>
          <Button component="a">Start Creating</Button>
        </Link>
        <Link href="/tutorials/explore" passHref>
          <Button component="a" variant="light">
            Explore Tutorials
          </Button>
        </Link>
      </Group>
      <Grid mt="5xl">
        <Grid.Col span={6}>
          <Title order={3}>Explore</Title>
          <Text>
            Learn new skills and get better at coding by following tutorials
            made by fellow Scratchers
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={3}>Write</Title>
          <Text>
            Ready to document your experience? Easily create tutorials for
            others to follow with a markdown-enabled editor
          </Text>
        </Grid.Col>
      </Grid>
    </Layout>
  );
}
