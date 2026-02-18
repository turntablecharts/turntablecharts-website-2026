import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from 'components/molecules/Navbar';
import Footer from 'components/molecules/Footer';
import Container from 'components/layouts/Container';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from 'lib/react-query';
import AppContainer from 'components/layouts/AppContainer';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-255HX44CTW`} />
      <Script strategy="lazyOnload" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-255HX44CTW');
        `}
      </Script>
      <Head>
        <title>TurnTable Charts - Music Charts, Insights & Analytics</title>
        <meta name="description" content="TurnTable Charts - Music Charts, Insights & Analytics" />
        <link rel="icon" href="/assets/icons/ttc-favicon.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Container>
          <Component {...pageProps} />
        </Container>
        <Footer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AppContainer>
  );
}

export default MyApp;
