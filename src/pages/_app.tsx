// src/pages/_app.tsx
import { withTRPC } from '@trpc/next';
import type { AppRouter } from '../server/router';
import type { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import '../styles/globals.css';
import { connectZustandStateToReduxDevtools } from 'store/reduxDevToolsConfig';
import Head from 'next/head';
import { Layout, PrivateRoute } from 'components';
import { useLayout } from 'store';
import { SessionProvider } from 'next-auth/react';

connectZustandStateToReduxDevtools();

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { isDark, showLayout } = useLayout();
  const protectedRoutes = [
    '/',
    '/users',
    '/users/[id]',
    '/users/new-user',
    '/transfers',
    '/transfers/[id]',
    '/featureFlags',
    '/repos',
    '/services',
  ];

  return (
    <SessionProvider session={session}>
      <PrivateRoute protectedRoutes={protectedRoutes}>
        <div className={`${isDark && 'dark'}`}>
          <Head>
            <title>Eco Admin App</title>
            <meta name="description" content="Eco Admin App" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {showLayout ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </div>
      </PrivateRoute>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.browser) return ''; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
