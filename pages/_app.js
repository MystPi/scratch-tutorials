import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import Head from 'next/head';
import { SWRConfig } from 'swr';

export default function App(props) {
  const { Component, pageProps } = props;
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const res = await fetch(...args);

          if (!res.ok) {
            const error = new Error('An error occured while fetching data');
            error.info = await res.json();
            error.status = res.status;
            throw error;
          }

          return res.json();
        },
      }}
    >
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            fontFamily: 'Roboto, sans-serif',
            headings: {
              fontFamily: 'Roboto, sans-serif',
            },
            colorScheme,
            spacing: {
              '2xl': 30,
              '3xl': 36,
              '4xl': 42,
              '5xl': 50,
              '6xl': 60,
            },
          }}
        >
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              name="description"
              content="Share your knowledge or learn something new with Scratchers worldwide"
            />
            <link rel="icon" href="/favicon.svg" />
          </Head>
          <Component {...pageProps} />
          <style global jsx>{`
            body {
              background-image: url('/background-${colorScheme}.svg');
            }
          `}</style>
        </MantineProvider>
      </ColorSchemeProvider>
    </SWRConfig>
  );
}
