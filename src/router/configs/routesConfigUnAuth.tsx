import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Spinner } from 'src/components/Loaders';
import { Layout } from 'src/layouts';

const Home = lazy(() => import('src/pages/noAuthenticated/HomePage'));
const ErrorPage = lazy(() => import('src/pages/authenticated/ErrorPage'));

const ImportKeywordsPage = lazy(() => import('src/pages/noAuthenticated/ImportKeywordsPage'));
const InstentionsPage = lazy(() => import('src/pages/noAuthenticated/IntentionsPage'));

// const ReserveLeadPage = lazy(() => import('src/pages/authenticated/ReserveLeadPage '));
// const ReserveLifeguardPage = lazy(() => import('src/pages/authenticated/ReserveLifeguardPage'));

export const routesConfigUnAuth = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        // errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Spinner />}>
                <ImportKeywordsPage />
              </Suspense>
            ),
          },
          {
            path: '/intentions',
            element: (
              <Suspense fallback={<Spinner />}>
                <InstentionsPage />
              </Suspense>
            ),
          },
          {
            path: '*',
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);
