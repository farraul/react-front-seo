import { createBrowserRouter } from 'react-router-dom';
import { Spinner } from 'src/components/Loaders';
import { Suspense, lazy } from 'react';
import Layout from 'src/layouts';

const ProfilePage = lazy(() => import('src/pages/authenticated/ProfilePage'));
const ErrorPage = lazy(() => import('src/pages/authenticated/ErrorPage'));
const ReserveLifeguardPage = lazy(() => import('src/pages/authenticated/ReserveLifeguardPage'));
const ReserveLeadPage = lazy(() => import('src/pages/authenticated/ReserveLeadPage '));

export const routesConfigAuth = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <p>falla</p>,
    children: [
      {
        errorElement: <p>falla</p>,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Spinner />}>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: '/reserve-lifeguard',
            element: (
              <Suspense fallback={<Spinner />}>
                <ReserveLifeguardPage />
              </Suspense>
            ),
          },
          {
            path: '/reserve-lead',
            element: (
              <Suspense fallback={<Spinner />}>
                <ReserveLeadPage />
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
