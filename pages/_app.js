import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import 'styles/global.css';

export default function App(props) {
  const { Component, pageProps } = props;

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
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          fontFamily: 'Roboto, sans-serif',
          headings: {
            fontFamily: 'Roboto, sans-serif',
          },
          colorScheme: 'light',
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
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Share your knowledge or learn something new with Scratchers worldwide"
          />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <Component {...pageProps} />
      </MantineProvider>
    </SWRConfig>
  );
}
