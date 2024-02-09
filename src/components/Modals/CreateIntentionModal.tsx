import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { PortalModal } from 'src/components/templates';
import { Button, CustomInput } from '../PrimitiveElements';

const initialState: any = {
  keywordToChange: '',
};

export const CreateIntentionModal = ({ closeModal, isOpenModal }: any) => {
  const onSubmit: SubmitHandler<any> = async (value: any) => {
    console.log({ value });
  };

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
    <PortalModal
      close={closeModal}
      typeModal='create'
      title='Nueva intención '
      isOpen={isOpenModal}
      className={'bg-slate-200 max-w-xl'}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='md:space-y-6 flex flex-col justify-center pb-10'
      >
        <CustomInput
          label='Escribe tu nueva intención: '
          name='keywordToChange'
          error={errors.keywordToChange?.message as string}
          register={register}
          rules={{
            required: true,
            minLength: {
              value: 2,
              message: 'Mínimo 2 caracteres.',
            },
          }}
          type='text'
          id='keywordToChange'
          isRequired={true}
          placeholder=''
          className='border-2 border-slate-300 border-solid mt-4 p-2 color-black  w-full'
        />
        <Button
          className='h-12 text-center hover:scale-110 active:scale-90 transition flex items-center text-white bg-blue-700 justify-center w-full'
          type='submit'
        >
          Crear intención
        </Button>
      </form>
    </PortalModal>
  );
};
