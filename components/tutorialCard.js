import { Card, Group, Button, Text, Anchor } from '@mantine/core';
import Link from 'next/link';

export default function TutorialCard({ tutorial }) {
  return (
    <Card shadow="sm" p="lg" sx={{ height: '100%' }}>
      <Group direction="column" spacing={0} sx={{ height: '100%' }}>
        <Text size="lg" lineClamp={2}>
          {tutorial.title}
        </Text>
        <Text color="dimmed" size="xs">
          By{' '}
          <Link href={`/tutorials/user/${tutorial.by}`} passHref>
            <Anchor size="xs">{tutorial.by}</Anchor>
          </Link>
        </Text>
        <Text
          my="sm"
          size="sm"
          color="gray"
          lineClamp={4}
          style={{ wordBreak: 'normal', overflowWrap: 'anywhere' }}
        >
          {tutorial.contents.slice(0, 800)}
        </Text>
        <Link href={`/tutorials/id/${tutorial.id}`} passHref>
          <Button mt="auto" component="a" variant="light" fullWidth>
            View
          </Button>
        </Link>
      </Group>
    </Card>
  );
}
