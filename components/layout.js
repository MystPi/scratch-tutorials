import {
  Container,
  Button,
  Group,
  AppShell,
  Header,
  Space,
  Skeleton,
  MediaQuery,
  Burger,
  Collapse,
} from '@mantine/core';
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import useUser from 'lib/useUser';

function NavItem({ children, href, active, ...props }) {
  if (active)
    return (
      <Button variant="light" compact {...props}>
        {children}
      </Button>
    );

  return (
    <Link href={href} passHref>
      <Button variant="subtle" component="a" compact {...props}>
        {children}
      </Button>
    </Link>
  );
}

async function signOut(mutateUser) {
  const res = await fetch('/api/auth/logout', { method: 'POST' });
  const json = await res.json();
  mutateUser(json);
}

export default function Layout({ children, tab, title }) {
  const { user, isLoading, mutateUser } = useUser();
  const [opened, setOpened] = useState(false);

  const navButtons = (
    <Group sx={{ flex: 1 }}>
      <NavItem href="/tutorials/explore" active={tab === 'explore'}>
        Explore
      </NavItem>
      <NavItem href="/guidelines" active={tab === 'guidelines'} mr="auto">
        Guidelines
      </NavItem>
      {isLoading === true && <Skeleton width={225} height={36} />}
      {user?.isLoggedIn === true && (
        <>
          <Link href="/editor" passHref>
            <Button component="a" color="yellow">
              Create Tutorial
            </Button>
          </Link>
          <Button
            color="gray"
            variant="light"
            onClick={() => signOut(mutateUser)}
          >
            Sign Out
          </Button>
        </>
      )}
      {user?.isLoggedIn === false && (
        <Link href="/api/auth/login" passHref>
          <Button component="a" ml="auto" color="yellow">
            Sign In
          </Button>
        </Link>
      )}
    </Group>
  );

  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Scratch Tutorials` : 'Scratch Tutorials'}
        </title>
      </Head>
      <Container p="xl">
        <AppShell
          padding="md"
          header={
            <Header
              sx={{
                height: 60,
                background: 'transparent',
                borderBottom: 'none',
              }}
            >
              <Group sx={{ height: '100%' }} px={16}>
                <NavItem href="/" active={tab === 'home'}>
                  Scratch Tutorials
                </NavItem>
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                  {navButtons}
                </MediaQuery>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    ml="auto"
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                  />
                </MediaQuery>
              </Group>
            </Header>
          }
        >
          <Collapse in={opened}>{navButtons}</Collapse>
          <Space h="xl" />
          {children}
        </AppShell>
      </Container>
    </>
  );
}
