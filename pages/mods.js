import { Title, Text, TypographyStylesProvider } from '@mantine/core';
import Layout from 'components/layout';

export default function Moderators() {
  const mods = ['NFlex23'];

  return (
    <Layout title="Moderators">
      <Title>Moderators</Title>
      <Text color="dimmed">
        Please contact a moderator listed below if you find a tutorial that
        violates the guidelines.
      </Text>
      <TypographyStylesProvider>
        <ul>
          {mods.map((mod) => (
            <li key={mod}>
              <a
                href={`https://scratch.mit.edu/users/${mod}#comments`}
                target="_blank"
              >
                {mod}
              </a>
            </li>
          ))}
        </ul>
      </TypographyStylesProvider>
    </Layout>
  );
}
