import {
  Title,
  Text,
  TextInput,
  Grid,
  Alert,
  Select,
  Loader,
} from '@mantine/core';
import { useState } from 'react';
import { useAll } from 'lib/useTutorial';
import Layout from 'components/layout';
import TutorialGroup from 'components/tutorialGroup';
import { FiSearch, FiX, FiInfo } from 'react-icons/fi';

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
  const [sort, setSort] = useState('new');
  const { tutorials, isLoading, isError } = useAll();
  let content, searched;

  if (isLoading || isError) {
    content = <Loader />;
  } else {
    searched = tutorials.filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.by.toLowerCase().includes(search.toLowerCase())
    );
    content = <TutorialGroup tutorials={searched} sort={sort} />;
  }

  return (
    <Layout tab="explore" title="Explore">
      <Grid align="center" mb="xl">
        <Grid.Col md={6}>
          <Title>Explore</Title>
          <Text color="dimmed">Find new and exciting tutorials!</Text>
        </Grid.Col>
        <Grid.Col md={4}>
          <SearchInput onSearch={(value) => setSearch(value)} />
        </Grid.Col>
        <Grid.Col md={2}>
          <Select
            aria-label="Sort"
            data={[
              { value: 'new', label: 'New to old' },
              { value: 'old', label: 'Old to new' },
            ]}
            value={sort}
            onChange={setSort}
          />
        </Grid.Col>
      </Grid>
      {content}
      {tutorials && searched.length === 0 && (
        <Alert
          sx={{ width: 'fit-content' }}
          mx="auto"
          mt="md"
          icon={<FiInfo />}
          title="Whoops"
          color="violet"
        >
          No tutorials were found. Try searching for something else.
        </Alert>
      )}
    </Layout>
  );
}
