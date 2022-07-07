import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "components/molecules/Navbar";
import Footer from "components/molecules/Footer";
import Container from "components/layouts/Container";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "lib/react-query";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TurnTable Charts - Music Charts, Insights & Analytics</title>
        <meta
          name="description"
          content="TurnTable Charts - Music Charts, Insights & Analytics"
        />
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
    </>
  );
}

export default MyApp;
