import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'src/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { useAppDispatch, useAppSelector } from 'src/hooks/useApp';
import { Company } from 'src/models/user/user';
import { setCredentials } from 'src/store/user/userSlice';
import { CustomInput } from '../PrimitiveElements';
import { CompanyRegister } from 'src/models/company';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import communities from 'src/configs/communities.json';
import provinces from 'src/configs/provinces.json';
import LocationAutocomplete from '../Autocomplete/LocationAutocomplete';

const initialState: CompanyRegister = {
  name: '',
  namePersonContact: '',
  email: '',
  phone: '',
  whatsApp: '',
  website: '',
  yearsActive: undefined,
  availability: '',
  priceHour: null,
  community: '',
  province: '',
  location: '',
  password: '',
  confirmPassword: '',
  servicesAditionals: [],
};

export const PopUpEditProfile = () => {
  const dispatch = useAppDispatch();
  const [ubication, setUbication] = useState({
    community: '',
    province: '',
  });
  const [isDisabled, setIsDisabled] = useState({
    province: true,
    location: true,
  });
  const user = useAppSelector<Company>((state) => state.user.userInfo);

  const [keywords, setKeywords] = useState();
  // const {
  //   name,
  //   namePersonContact,
  //   email,
  //   whatsApp,
  //   yearsActive,
  //   community,
  //   province,
  //   availability,
  //   priceHour,
  //   location,
  //   id,
  //   servicesAditionals,
  // } = user;

  const {
    register,
    handleSubmit,
    getValues,
    control,
    setValue,
    resetField,
    reset,
    getFieldState,
    formState: { errors },
  } = useForm<CompanyRegister>({
    defaultValues: initialState,
  });

  const [profile, setProfile] = useState<Company>(user);

  function handleChange(e: any) {
    const value = e.target.value;
    setProfile({ ...profile, [e.target.name]: value });
  }

  // function handleSubmit(e: any) {
  //   e.preventDefault();
  // }
  const onSubmit: SubmitHandler<any> = (value) => {
    console.log('data: ', value);
    dispatch(setCredentials(profile));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Editar perfil</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
            <DialogDescription>El email no se puede modificar.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
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
                    value: 3,
                    message: 'Mínimo 3 caracteres.',
                  },
                }}
                type='text'
                id='name'
                isRequired={true}
                placeholder='Nombre empresa'
              />
              <CustomInput
                name='namePersonContact'
                error={errors.namePersonContact?.message as string}
                register={register}
                rules={{
                  required: true,
                  minLength: {
                    value: 1,
                    message: 'Mínimo 3 caracteres.',
                  },
                }}
                type='text'
                id='namePersonContact'
                isRequired={true}
                placeholder='Persona de contacto'
              />
              <CustomInput
                name='phone'
                error={errors.phone?.message as string}
                register={register}
                rules={{
                  required: true,
                  minLength: {
                    value: 1,
                    message: 'Mínimo 1 caracteres.',
                  },
                }}
                type='number'
                id='phone'
                isRequired={true}
                placeholder='Nº teléfono'
              />
              <CustomInput
                name='whatsapp'
                error={errors.whatsApp?.message as string}
                register={register}
                rules={{
                  required: true,
                  minLength: {
                    value: 1,
                    message: 'Mínimo 1 caracteres.',
                  },
                }}
                type='number'
                id='whatsapp'
                isRequired={true}
                placeholder='Whatsapp'
              />
              <CustomInput
                name='yearsAcive'
                error={errors.yearsActive?.message as string}
                register={register}
                rules={{
                  required: true,
                  minLength: {
                    value: 1,
                    message: 'Mínimo 1 caracteres.',
                  },
                }}
                type='text'
                id='yearsActive'
                isRequired={true}
                placeholder='Años de experiencia'
              />
              <CustomInput
                name='priceHour'
                error={errors.yearsActive?.message as string}
                register={register}
                rules={{
                  required: true,
                  minLength: {
                    value: 1,
                    message: 'Mínimo 1 caracteres.',
                  },
                }}
                type='number'
                id='priceHour'
                isRequired={true}
                placeholder='Precio la hora'
              />
              <div className=''>
                <Controller
                  name='community'
                  rules={{
                    required: {
                      value: true,
                      message: 'Este campo es requerido',
                    },
                  }}
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <Select
                          required
                          onValueChange={(e) => {
                            setIsDisabled({ province: false, location: true });
                            setUbication((prev) => ({ ...prev, community: e }));
                            setValue('province', '');

                            const nameCommunitySelected = communities.filter(
                              (comunity) => comunity.code === e,
                            )[0].label;
                            field.onChange(nameCommunitySelected);
                          }}
                        >
                          <SelectTrigger className='w-[100%] bg-white'>
                            <SelectValue placeholder='Comunidad autonóma' />
                          </SelectTrigger>

                          <SelectContent>
                            {communities.map((community) => (
                              <SelectItem key={community.label} value={community.code}>
                                {community.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {fieldState.error?.message && (
                          <p className='mt-3 ml-1 text-xs text-red-500 self-start '>
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>
              <div className=''>
                <Controller
                  name='province'
                  rules={{
                    required: {
                      value: true,
                      message: 'Este campo es requerido',
                    },
                  }}
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <Select
                          required
                          disabled={isDisabled.province}
                          onValueChange={(e) => {
                            const nameProvinceSelected = provinces.filter((province) => {
                              // console.log({ province });
                              // console.log({ e });
                              return province.code === e;
                            })[0].label;
                            console.log({ nameProvinceSelected });
                            field.onChange(nameProvinceSelected);
                            setUbication((prev) => ({ ...prev, province: e }));
                            setIsDisabled({ ...isDisabled, location: false });
                          }}
                        >
                          <SelectTrigger className='w-[100%] bg-white'>
                            <SelectValue placeholder='Provincias' />
                          </SelectTrigger>
                          <SelectContent>
                            {provinces.map((province) => {
                              console.log;
                              if (province.parent_code === ubication.community) {
                                return (
                                  <SelectItem key={province.label} value={province.code}>
                                    {province.label}
                                  </SelectItem>
                                );
                              }
                            })}
                          </SelectContent>
                        </Select>

                        {fieldState.error?.message && (
                          <p className='mt-3 ml-1 text-xs text-red-500 self-start '>
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>
              <Controller
                name='location'
                control={control}
                render={({ field }) => (
                  <LocationAutocomplete
                    provinceSelected={ubication.province}
                    isDisabled={isDisabled.location}
                    control={control}
                    field={field}
                  />
                )}
              />
              <p className='text-white'>Cuenta:</p>
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
          </div>
          <DialogFooter onClick={onSubmit}>
            <DialogClose>
              <p className='btn-secondary'>Save changes</p>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
