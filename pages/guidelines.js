import { Title, Text, TypographyStylesProvider } from '@mantine/core';
import Link from 'next/link';
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
          If you find a tutorial violating the guidelines below, please contact{' '}
          <Link href="/mods">
            <a>a moderator</a>
          </Link>{' '}
          right away
        </h2>
        <p>
          They will try to fix or delete the tutorial as fast as they can; don't
          worry!
        </p>

        <hr />

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
          Anything that goes against the CGs will be removed.
        </p>
        <h2>Tutorials must be tutorials, nothing else</h2>
        <p>
          If you're unsure about whether or not it's okay to submit something,
          feel free to contact{' '}
          <a
            href="https://scratch.mit.edu/users/NFlex23#comments"
            target="_blank"
            rel="noreferrer"
          >
            the Scratch Tutorials creator on Scratch
          </a>
          .
        </p>
        <h2>Tutorials must be related to Scratch in some way</h2>
        <p>
          Please don't submit off-topic tutorials that aren't related to Scratch
          in any way. This is <b>Scratch</b> Tutorials after all.
        </p>
        <h2>
          If you continue to break the guidelines, you <i>will</i> be banned
          from using Scratch Tutorials!
        </h2>
        <p>
          We want this site to be safe for everyone. If you continue to
          violate these guidelines, you <i>will</i> be banned from using Scratch
          Tutorials. This includes creating, editing, and viewing tutorials.
        </p>
      </TypographyStylesProvider>
    </Layout>
  );
}
