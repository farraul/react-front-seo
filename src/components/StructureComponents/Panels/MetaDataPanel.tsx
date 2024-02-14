import React from 'react';
import { useForm } from 'react-hook-form';
import { CustomInput } from 'src/components/PrimitiveElements';

const initialState: any = {
  tiele: '',
  metaDescription: '',
};

export const MetaDataPanel = () => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: initialState,
  });
  return (
    <div className='bg-blue-800 px-10 py-10'>
      <div className='flex  items-center '>
        <p className=' text-white text-right  w-[130px] pr-4 text-sm'>URL:</p>
        <CustomInput
          label=''
          name='url'
          error={errors.title?.message as string}
          register={register}
          rules={{
            required: true,
            minLength: {
              value: 10,
              message: 'Mínimo 10 caracteres.',
            },
          }}
          type='text'
          id='url'
          isRequired={true}
          placeholder='La tiene que tener  al menos 2 charactreres'
          className='border-2 border-slate-200 border-solid  p-2 color-black  w-full text-sm'
        />
      </div>
      <div className='flex pt-4  items-center'>
        <p className=' text-white text-right  w-[130px] pr-4 text-sm'>Title:</p>
        <CustomInput
          label=''
          name='title'
          error={errors.title?.message as string}
          register={register}
          rules={{
            required: true,
            minLength: {
              value: 10,
              message: 'Mínimo 10 caracteres.',
            },
          }}
          type='text'
          id='title'
          isRequired={true}
          placeholder='El title tiene que tener de 10 a 90 charactreres'
          className='border-2 border-slate-200 border-solid  p-2 color-black  w-full text-sm'
        />
      </div>
      <div className='flex pt-4 items-center '>
        <div className=' text-white w-[130px] pr-4 text-sm text-right '>
          <p>Meta</p> <p>description:</p>
        </div>
        <CustomInput
          label=''
          name='metaDescription'
          error={errors.metaDescription?.message as string}
          register={register}
          rules={{
            required: true,
            minLength: {
              value: 10,
              message: 'Mínimo 10 caracteres.',
            },
          }}
          type='text'
          id='metaDescription'
          isRequired={true}
          placeholder='La meta-description tiene que tener de 170 a 200 charactreres'
          className='border-2 border-slate-200 border-solid  p-2 color-black w-full text-sm'
        />
      </div>
    </div>
  );
};
