import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {QueryClient, QueryClientProvider, Hydrate } from "react-query";
import Layout from '../components/layout'
import { AppWrapper } from "../context/AppContext";
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
      <AppWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppWrapper>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp
