import React from 'react';
import jwtService from 'src/auth/jwtService';
import { UserInfo } from 'src/models/user/user';
import { useNavigate } from 'react-router-dom';

type typeAuth = 'login' | 'register';

interface LoginData {
  email: string;
  password: string;
}

const useAuth = (type: typeAuth) => {
  const navigate = useNavigate();

  const onSubmit = (user: UserInfo | LoginData) => {
    if (type === 'login') {
      const { email, password } = user as LoginData;

      // if (email === '0' && password === '0') { }

      jwtService
        .signInWithEmailAndPassword(email, password)
        .then((_user) => {
          navigate('/');
          // No need to do anything, user data will be set at app/auth/AuthContext
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    } else {
      console.log('User created');

      // jwtService.createUser(user);
    }
  };

  return { onSubmit };
};

export default useAuth;
