import React from 'react';
import { Button, CustomInput } from '../PrimitiveElements';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Headings } from 'src/models/seo/seo';
import { getAnalyseUrlSeo } from 'src/services/seo';

const initialState: any = {
  url: '',
};

export const Form = ({ handleIntegrateHeadings }: any) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: initialState,
  });

  const onSubmit: SubmitHandler<any> = async ({ url }) => {
    console.log({ url });
    try {
      const response = await getAnalyseUrlSeo(url);

      const headings: Headings[] = [];

      for (let i = 0; i <= 6; i++) {
        if (response.data[`h${i}`]?.length) {
          headings.push({ [`h${i}`]: response.data[`h${i}`] });
        }
      }
      handleIntegrateHeadings(headings, response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 md:space-y-6 flex flex-col justify-center py-10'
    >
      <CustomInput
        name='url'
        error={errors.url?.message as string}
        register={register}
        rules={{
          required: true,
          minLength: {
            value: 2,
            message: 'Mínimo 2 caracteres.',
          },
        }}
        type='text'
        id='url'
        isRequired={true}
        placeholder='Escribe una url'
        className='border-2 border-slate-300 border-solid mt-4 p-2  w-full'
      />{' '}
      <Button
        className='h-12 text-center hover:scale-110 active:scale-90 transition flex items-center text-white bg-black justify-center  w-full'
        type='submit'
      >
        Analizar Url
      </Button>
    </form>
  );
};
