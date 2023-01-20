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
  ActionIcon,
  useMantineColorScheme,
  Affix,
  Transition,
  Alert,
  Anchor,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import useUser from 'lib/useUser';
import { FiSun, FiMoon, FiArrowUp, FiAlertTriangle } from 'react-icons/fi';

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
  const [scroll, scrollTo] = useWindowScroll();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

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
      <ActionIcon
        variant="outline"
        color="yellow"
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
        size="lg"
      >
        {dark ? <FiSun /> : <FiMoon />}
      </ActionIcon>
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
          fixed={false}
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
          <Alert icon={<FiAlertTriangle />} title="EOL update" color="orange">
            Although it is sad to see it go, Scratch Tutorials has reached its
            end of life. The site will soon be taken down, so please save
            tutorials that you don't want to get lost. If you are looking for an
            alternative,{' '}
            <Anchor href="https://thedailygobo.scratchtools.app/">
              The Daily Gobo
            </Anchor>{' '}
            is a great site that is similar to Scratch Tutorials.
          </Alert>
          <Space h="xl" />
          {children}
        </AppShell>
      </Container>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
              color="blue"
              variant="light"
              size="lg"
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              <FiArrowUp />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
}
