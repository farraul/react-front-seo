// import { SignUp } from 'src/models/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomInput, Input } from 'src/components/PrimitiveElements/Input';
import { Button } from 'src/components/PrimitiveElements/Button';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

import ccaa from 'src/configs/communities.json';
import provinces from 'src/configs/provinces.json';
import LocationsAutoCompelte from 'src/components/Autocomplete/LocationAutocomplete';
import experiences from 'src/configs/experiences';
import { useAppSelector } from 'src/hooks/useApp';

const initialState: any = {
  name: '',
  lastName: '',
  email: '',
  age: 0,
  community: '',
  province: '',
  location: '',
  experience: '',
  move: '',
  password: '',
  confirmPassword: '',
};

type Inputs = {
  email: string;
  password: string;
  community: string;
};

export const AdministratorForm = () => {
  const [ccaaSelected, setCcaaSelected] = useState('');
  const [provinceSelected, setProvinceSelected] = useState('');
  const [isDisabled, setIsDisabled] = useState({
    province: true,
    location: true,
  });
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: initialState,
  });
  const navigate = useNavigate();

  //   const {} = getValues();

  const onSubmit: SubmitHandler<Inputs> = (value) => {
    console.log('data: ', value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 md:space-y-6 flex flex-col justify-center'
    >
      <CustomInput
        name='name'
        error={errors.name?.message as string}
        register={register}
        rules={{
          required: true,
          minLength: {
            value: 1,
            message: 'Mínimo 3 caracteres.',
          },
        }}
        type='text'
        id='name'
        isRequired={true}
        placeholder='Nombre'
      />
      <CustomInput
        name='lastName'
        error={errors.lastName?.message as string}
        register={register}
        rules={{
          required: true,
          minLength: {
            value: 1,
            message: 'Mínimo 3 caracteres.',
          },
        }}
        type='text'
        id='lastName'
        isRequired={true}
        placeholder='Apellidos'
      />
      <CustomInput
        name='email'
        error={errors.email?.message as string}
        register={register}
        rules={{
          required: true,

          pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: 'No es un email válido.',
          },
        }}
        type='text'
        id='email'
        isRequired={true}
        placeholder='Email'
      />
      {/* <CustomInput
        name='age'
        error={errors.age?.message as string}
        register={register}
        rules={{
          required: true,
        }}
        type='number'
        id='age'
        isRequired={true}
        placeholder='Edad'
      /> */}
      <p className='text-secondary-generic'> Localización de la pisicina:</p>
      <div className=''>
        <Controller
          name='community'
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(e) => {
                field.onChange(e);
                setCcaaSelected(e);
                setProvinceSelected('');
                setIsDisabled({ province: false, location: true });
              }}
            >
              <SelectTrigger className='w-[100%] bg-white'>
                <SelectValue placeholder='Comunidad autonóma' />
              </SelectTrigger>

              <SelectContent>
                {ccaa.map((community) => (
                  <SelectItem key={community.label} value={community.code}>
                    {community.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className=''>
        <Controller
          name='province'
          control={control}
          render={({ field }) => (
            <Select
              disabled={isDisabled.province}
              onValueChange={(e) => {
                field.onChange(e);
                setProvinceSelected(e);
                setIsDisabled({ ...isDisabled, location: false });
              }}
            >
              <SelectTrigger className='w-[100%] bg-white'>
                <SelectValue placeholder='Provincias' />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => {
                  console.log;
                  if (province.parent_code === ccaaSelected) {
                    return (
                      <SelectItem key={province.label} value={province.code}>
                        {province.label}
                      </SelectItem>
                    );
                  }
                })}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <LocationsAutoCompelte
        provinceSelected={provinceSelected}
        isDisabled={isDisabled.location}
        control={control}
      />
      {/* <div className=''>
        <Select
        //   onValueChange={(e) => {
        //     setProvinceSelected(e);
        //   }}
        >
          <SelectTrigger className='w-[100%] bg-white'>
            <SelectValue placeholder='Experiencia' />
          </SelectTrigger>
          <SelectContent>
            {experiences.map((experience) => {
              return (
                <SelectItem key={experience} value={experience}>
                  {experience}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div> */}
      <CustomInput
        name='password'
        error={errors.password?.message as string}
        register={register}
        rules={{
          required: true,
          minLength: {
            value: 1,
            message: 'Mínimo 6 caracteres.',
          },
        }}
        type='password'
        id='password'
        isRequired={true}
        placeholder='Contraseña'
      />
      <CustomInput
        name='confirmPassword'
        error={errors.confirmPassword?.message as string}
        register={register}
        rules={{
          required: true,
          validate: (value) => {
            const { password } = getValues();
            console.log(value, password);
            if (password !== value) return 'Your password does not match';
          },
        }}
        type='password'
        id='confirmPassword'
        isRequired={true}
        placeholder='Repetir contraseña'
      />
      <Button
        className='h-12 text-center hover:scale-110 active:scale-90 transition flex items-center text-black bg-white justify-center'
        type='submit'
      >
        Loguearse
      </Button>
      <p className='text-sm font-light text-white dark:text-black flex gap-4'>
        ¿Ya tienes sesión?
        <Link
          to='/'
          className='hover:scale-110 transition font-medium text-primary-600 hover:underline'
        >
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
};

export default AdministratorForm;
