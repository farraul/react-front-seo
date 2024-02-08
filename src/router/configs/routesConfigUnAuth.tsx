import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Spinner } from 'src/components/Loaders';
import { Layout } from 'src/layouts';

const Home = lazy(() => import('src/pages/noAuthenticated/HomePage'));
const ErrorPage = lazy(() => import('src/pages/authenticated/ErrorPage'));

const KeywordsPage = lazy(() => import('src/pages/noAuthenticated/KeywordsPage'));
const InstentionsPage = lazy(() => import('src/pages/noAuthenticated/IntentionsPage'));
const EstructurePage = lazy(() => import('src/pages/noAuthenticated/EstructurePage'));
const GenerateTextPage = lazy(() => import('src/pages/noAuthenticated/GenerateTextPage'));
const AnalizeSerpPage = lazy(() => import('src/pages/noAuthenticated/AnalizeSerp'));

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
                <KeywordsPage />
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
            path: '/estructure',
            element: (
              <Suspense fallback={<Spinner />}>
                <EstructurePage />
              </Suspense>
            ),
          },
          {
            path: '/generate-text',
            element: (
              <Suspense fallback={<Spinner />}>
                <GenerateTextPage />
              </Suspense>
            ),
          },

          {
            path: '/analize-serp',
            element: (
              <Suspense fallback={<Spinner />}>
                <AnalizeSerpPage />
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
