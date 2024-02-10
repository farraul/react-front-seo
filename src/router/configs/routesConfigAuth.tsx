import { createBrowserRouter } from 'react-router-dom';
import { Spinner } from 'src/components/Loaders';
import { Suspense, lazy } from 'react';
import Layout from 'src/layouts';

const ErrorPage = lazy(() => import('src/pages/authenticated/ErrorPage'));

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
            path: '*',
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);
