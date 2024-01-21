import * as React from 'react';
import { useEffect, useState, createContext } from 'react';
import { logout, setCredentials } from 'src/store/user/userSlice';
import { showMessage } from 'src/store/messageSlice';
import jwtService from './jwtService';
import Cookies from 'js-cookie';
import { useAppDispatch } from 'src/hooks/useApp';
import { Spinner } from 'src/components/Loaders';
import profileCompanyStub from 'src/stub/profileCompanyStub copy.json';

type PropsProvider = {
  children: React.ReactNode;
};

type Values = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<Values>({
  token: '',
  setToken: () => false,
});

export const AuthProvider = ({ children }: PropsProvider) => {
  const [token, setToken] = useState(Cookies.get('jwt_access_token') || '');
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    jwtService.on('onAutoLogin', () => {
      dispatch(showMessage({ message: 'Signing in with JWT' }));

      jwtService
        .signInWithToken()
        .then((user) => {
          success(user, 'Signed in with JWT');
        })
        .catch((error) => {
          pass(error.message);
        })
        .finally(() => {});
    });

    jwtService.on('onLogin', (user: any) => {
      success(user, 'Signed in');
      setToken(user.token);
    });

    jwtService.on('onNoAccessToken', () => {
      pass();
    });

    jwtService.on('onLogout', () => {
      pass('Signed out');
      dispatch(logout());
      setToken('');
    });

    jwtService.init();

    function success(user: any, message: any) {
      //check

      // const defaultUser = {
      //   name: 'Isabel',
      //   lastName: 'García',
      //   email: 'isabel@gmail.com',
      //   age: 30,
      //   community: 'AND',
      //   province: 'Almería',
      //   location: 'El Ejido',
      //   experience: '1 año',
      //   id: '59363115-6841-4363-a277-482137545891',
      //   move: 'yes',
      //   token: 'toek',
      // };

      if (message) {
        dispatch(showMessage({ message }));
      }

      Promise.all([dispatch(setCredentials(profileCompanyStub))]).then((values) => {
        setWaitAuthCheck(false);
      });
    }

    function pass(message?: any) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      setWaitAuthCheck(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <Spinner />
  ) : (
    <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>
  );
};
