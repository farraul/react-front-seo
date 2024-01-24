import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Spinner } from 'src/components/Loaders';
import { Layout } from 'src/layouts';

const Home = lazy(() => import('src/pages/noAuthenticated/HomePage'));
const LoginPage = lazy(() => import('src/pages/noAuthenticated/LoginPage'));

const LifeguardRegisterPage = lazy(() => import('src/pages/noAuthenticated/LifeguardRegisterPage'));
const CompanyRegisterPage = lazy(() => import('src/pages/noAuthenticated/CompanyRegisterPage'));
const AdministratorRegisterPage = lazy(
  () => import('src/pages/noAuthenticated/AdministratorRegisterPage'),
);

const ErrorPage = lazy(() => import('src/pages/authenticated/ErrorPage'));
const AddKeywordsPage = lazy(() => import('src/pages/noAuthenticated/AddKeywordsPage'));
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
                <AddKeywordsPage />
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
            path: '/login',
            element: (
              <Suspense fallback={<Spinner />}>
                <LoginPage />
              </Suspense>
            ),
          },

          {
            path: '/register-lifeguard',
            element: (
              <Suspense fallback={<Spinner />}>
                <LifeguardRegisterPage />
              </Suspense>
            ),
          },

          {
            path: '/register-administrator',
            element: (
              <Suspense fallback={<Spinner />}>
                <AdministratorRegisterPage />
              </Suspense>
            ),
          },

          {
            path: '/register-company',
            element: (
              <Suspense fallback={<Spinner />}>
                <CompanyRegisterPage />
              </Suspense>
            ),
          },
          // {
          //   path: '/reserve-lead',
          //   element: (
          //     <Suspense fallback={<Spinner />}>
          //       <ReserveLeadPage />
          //     </Suspense>
          //   ),
          // },
          // {
          //   path: '/reserve-lifeguard',
          //   element: (
          //     <Suspense fallback={<Spinner />}>
          //       <ReserveLifeguardPage />
          //     </Suspense>
          //   ),
          // },
          {
            path: '*',
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);
