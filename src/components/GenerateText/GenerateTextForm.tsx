import axios from 'axios';
import React, { useState } from 'react';
import { RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from 'react-hook-form';
import { Button, CustomInput, Select } from 'src/components/PrimitiveElements';
import {
  API_RAPID_GENERATE_TEXT_HOST,
  API_RAPID_GENERATE_TEXT_KEY,
  API_RAPID_GENERATE_TEXT_URL,
} from 'src/constants/API';
import { number } from 'yup';
import structuresStub from 'src/stub/structuresStub.json';
import AreaCustom from '../PrimitiveElements/Area/AreaCustom';

const initialState: any = {
  estructure: '',
  quantityWords: null,
  tematic: '',
  purpose: '',
};

const estructure = Object.keys(structuresStub)[0];
const selectOptions = [
  { name: estructure, value: estructure, section: 'seos' },
  { name: 'SEM', value: 'b', section: 'sems' },
];
console.log('selectOptions:', selectOptions);

export const GenerateTextForm = ({ setTextGenerated, setIsLoading }: any) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: initialState,
  });

  const onSubmit: SubmitHandler<any> = async (value) => {
    const { quantityWords, tematic, estructure, purpose } = value;

    const textRequest = `Escribe un texto que tenga sobre ${quantityWords} palabras sobre esta temática: ${tematic}
      La estructura del texto debe ser la siguiente: ${estructure}.
      En este apartado debes usar estas palabras clave: “cómo aplicar el lifelong learning”, “proceso para implantar el lifelong learning”.
      Elabora el texto con una finalidad ${purpose}. El texto tiene que ser en html, ejemplo h1:ejemplo h2: ejemplo p: ejemplo`;

    const options = {
      method: 'POST',
      url: API_RAPID_GENERATE_TEXT_URL,
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': API_RAPID_GENERATE_TEXT_KEY,
        'X-RapidAPI-Host': API_RAPID_GENERATE_TEXT_HOST,
      },
      data: {
        messages: [
          {
            role: 'user',
            content: textRequest,
          },
        ],
        system_prompt: '',
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false,
      },
    };

    try {
      setIsLoading(true);
      const response = await axios.request(options);
      console.log(response.data);
      console.log(response.data.result);
      setTextGenerated(response.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const importStructure = (e: any) => {
    console.log(e);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 md:space-y-6 flex flex-col justify-center py-10'
    >
      <CustomInput
        label='Número de palabras:'
        name='quantityWords'
        error={errors.quantityWords?.message as string}
        register={register}
        rules={{
          required: true,
          minLength: {
            value: 1,
            message: 'Mínimo4 caracteres.',
          },
        }}
        type='number'
        id='quantityWords'
        isRequired={true}
        placeholder='Escribe el nº de keywords'
        className='border-2 border-slate-300 border-solid mt-4 p-2 color-black  w-full'
      />
      <CustomInput
        label='Temática del texto:'
        name='tematic'
        error={errors.tematic?.message as string}
        register={register}
        rules={{
          required: true,
          minLength: {
            value: 5,
            message: 'Mínimo 5 caracteres.',
          },
        }}
        type='text'
        id='tematic'
        isRequired={true}
        placeholder='Escribe la tematica'
        className='border-2 border-slate-300 border-solid mt-4 p-2 color-black  w-full'
      />

      <CustomInput
        label='La estructura del texto (H1, H2, H3, Keywords...)'
        name='estructure'
        error={errors.estructure?.message as string}
        register={register}
        rules={{
          required: true,
          minLength: {
            value: 1,
            message: 'Mínimo 5 caracteres.',
          },
        }}
        type='text'
        id='estructure'
        isRequired={true}
        placeholder='Escribe la estructura'
        className='border-2 border-slate-300 border-solid mt-4 p-2  w-full '
      />
      <div>
        <p>Importar estructura</p>
        <Select
          id='brand'
          name='brand'
          color='text-red-200'
          // values={values?.brand as string}
          // onChange={handleChange}
          // placeholder={`${values && values.brand ? values.brand : 'Type brand'}`}
          options={selectOptions}
          className='border-2 border-slate-300 p-2'
        />
      </div>
      <CustomInput
        label='Finalidad del texto :'
        name='purpose'
        error={errors.estructure?.message as string}
        register={register}
        rules={{
          required: true,
          minLength: {
            value: 1,
            message: 'Mínimo 5 caracteres.',
          },
        }}
        type='text'
        id='purpose'
        isRequired={true}
        placeholder='Escribe la finalidad'
        className='border-2 border-slate-300 border-solid mt-4 p-2  w-full'
      />
      <AreaCustom id={''} error={''} register={register} />
      <Button
        className='h-12 text-center hover:scale-110 active:scale-90 transition flex items-center text-white bg-black justify-center  w-full'
        type='submit'
      >
        Crear texto
      </Button>
    </form>
  );
};
