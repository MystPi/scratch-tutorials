import { Title, Text, TextInput, Grid } from '@mantine/core';
import { useState } from 'react';
import { useAll } from 'lib/useTutorial';
import Layout from 'components/layout';
import TutorialGroup from 'components/tutorialGroup';
import status from 'components/status';
import { FiSearch, FiX } from 'react-icons/fi';

function SearchInput({ onSearch }) {
  const [value, setValue] = useState('');

  return (
    <TextInput
      aria-label="Search"
      placeholder="Search..."
      rightSection={
        value ? (
          <FiX
            cursor="pointer"
            onClick={() => {
              setValue('');
              onSearch('');
            }}
          />
        ) : (
          <FiSearch />
        )
      }
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onSearch(value);
        }
      }}
    />
  );
}

export default function Explore() {
  const [search, setSearch] = useState('');
  const { tutorials, isLoading, isError } = useAll();
  const Status = status('Explore', isLoading, isError);

  if (Status) return Status;

  return (
    <Layout tab="explore" title="Explore">
      <Grid align="center" mb="xl">
        <Grid.Col md={8}>
          <Title>Explore</Title>
          <Text color="dimmed">Find new and exciting tutorials!</Text>
        </Grid.Col>
        <Grid.Col md={4}>
          <SearchInput onSearch={(value) => setSearch(value)} />
        </Grid.Col>
      </Grid>
      <TutorialGroup
        tutorials={tutorials.filter(
          (t) =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.by.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </Layout>
  );
}
