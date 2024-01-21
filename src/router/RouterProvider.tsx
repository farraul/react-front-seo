import React, { Suspense } from 'react';
import { RouterProvider as Provider } from 'react-router-dom';
import { routesConfigAuth } from './configs/routesConfigAuth';
import { routesConfigUnAuth } from './configs/routesConfigUnAuth';
import { Spinner } from 'src/components/Loaders';
import { useGetUserIsLogged } from 'src/hooks/useGetUserIsLogged';

const RouterProvider = () => {
  const isLogin = useGetUserIsLogged();
  // isLogin = true;

  console.log({ isLogin });
  return (
    <Suspense fallback={<Spinner />}>
      {isLogin ? <Provider router={routesConfigAuth} /> : <Provider router={routesConfigUnAuth} />}
    </Suspense>
  );
};

export default RouterProvider;
