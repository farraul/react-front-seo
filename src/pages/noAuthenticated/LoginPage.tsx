import { Container } from '@mui/material';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useRoutes, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useApp';
// import { SignIn } from 'src/models/auth';
import jwtService from 'src/auth/jwtService';
import { Button, CustomInput, Input } from 'src/components/PrimitiveElements';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { object, string, number, AnyObject, ObjectSchema } from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { error } from 'console';
import useAuth from 'src/hooks/useAuth';

type Inputs = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { onSubmit } = useAuth('login');
  const user = useAppSelector((state) => state.user);

  const onSubmitLocal: SubmitHandler<Inputs> = (value) => {
    onSubmit(value);
  };

  // useEffect(() => {
  //   if (success) {
  //     navigate('/login');
  //   }
  // }, [navigate, success]);

  return (
    <>
      <img
        src='/assets/images/backgrounds/beach-background.jpg'
        alt='image of products'
        className='w-full h-screen z-[-1] fixed top-0 left-0'
        style={{ objectFit: 'cover' }}
      />
      <Container component='main' maxWidth='xs'>
        {/* <CssBaseline /> */}
        <div className='w-full bg-white  shadow dark:border mt-4 md:mt-20 sm:max-w-md xl:p-0 z-20'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8 bg-primary'>
            <h4 className='text-center text-xl font-light leading-tight tracking-tight text-white md:text-4xl '>
              Iniciar sesión
            </h4>

            <form
              onSubmit={handleSubmit(onSubmitLocal)}
              className='space-y-4 md:space-y-6 flex flex-col justify-center'
            >
              <CustomInput
                label='email'
                name='email'
                error={errors.email?.message as string}
                register={register}
                type='text'
                id='email'
                isRequired={true}
                placeholder='Email'
              />

              <CustomInput
                label='password'
                name='password'
                error={errors.password?.message as string}
                register={register}
                type='password'
                id='password'
                isRequired={true}
                placeholder='Paswword'
              />
              <Button
                className='h-12 text-center hover:scale-110 active:scale-90 transition flex items-center text-black bg-white justify-center'
                type='submit'
              >
                Loguearse
              </Button>
              <p className='text-sm font-light text-white dark:text-black flex gap-4'>
                ¿Aun no estas logueado?
                <Link
                  to='/register'
                  className='hover:scale-110 transition font-medium text-primary-600 hover:underline'
                >
                  Registrate
                </Link>
              </p>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default LoginPage;
