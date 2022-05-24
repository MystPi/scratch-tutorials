import { Title, Text, TypographyStylesProvider } from '@mantine/core';
import Layout from 'components/layout';

export default function Guidelines() {
  return (
    <Layout tab="guidelines" title="Guidelines">
      <Title>Guidelines</Title>
      <Text color="dimmed">
        Make sure you've read these before submitting a tutorial.
      </Text>
      <TypographyStylesProvider>
        <h2>
          All tutorials must conform to{' '}
          <a
            href="https://scratch.mit.edu/community_guidelines"
            target="_blank"
            rel="noreferrer"
          >
            Scratch's Community Guidelines
          </a>
        </h2>
        <p>
          Since this site is used by Scratchers, it must be safe for them.
          Anything that goes against the CGs will be removed ASAP.
        </p>
        <h2>Tutorials must actually be tutorials, not anything else</h2>
        <p>
          If you're unsure about whether or not it's okay to submit something,
          feel free to contact{' '}
          <a
            href="https://scratch.mit.edu/users/NFlex23#comments"
            target="_blank"
            rel="noreferrer"
          >
            the creator on Scratch
          </a>
          .
        </p>
        <h2>
          If you see an inappropriate, or otherwise unfit, tutorial, contact{' '}
          <a
            href="https://scratch.mit.edu/users/NFlex23#comments"
            target="_blank"
            rel="noreferrer"
          >
            the creator
          </a>{' '}
          right away
        </h2>
      </TypographyStylesProvider>
    </Layout>
  );
}
