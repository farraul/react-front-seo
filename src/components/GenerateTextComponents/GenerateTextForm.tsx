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
import structuresStub from 'src/stubs/structuresStub.json';
import CustomTextArea from '../PrimitiveElements/Area/AreaCustom';
import { rapidApiService } from 'src/services/rapidApiService';

const initialState: any = {
  estructure: '',
  quantityWords: null,
  area: '',
  tematic: '',
  purpose: '',
};

const estructure = Object.keys(structuresStub)[0];
const selectOptions = [
  { name: 'SEM', value: 'h1: SEM h2: que es sem h3: de donde sale el Sem' },
  { name: 'SEO', value: 'h1: SEO h2: que es seo' },
];
console.log('selectOptions:', selectOptions);

export const GenerateTextForm = ({ setTextGenerated, setIsLoading }: any) => {
  const [importStructure, setImportStructure] = useState('Escribe estrucura');
  console.log('GenerateTextForm  importStructure:', importStructure);

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

    const textRequest = `Escribe un texto que tenga sobre ${quantityWords} palabras sobre esta temática: ${tematic}. La estructura del texto debe ser la siguiente: ${estructure}.
      En este apartado debes usar estas palabras clave: cómo aplicar el lifelong learning, proceso para implantar el lifelong learning.
      Elabora el texto con una finalidad ${purpose}. El texto tiene que ser en html, ejemplo h1:ejemplo h2: ejemplo p: ejemplo`;

    try {
      setIsLoading(true);
      const response = await rapidApiService(textRequest);
      setTextGenerated(response.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const importStructures = (e: any) => {
    console.log(e);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4  flex flex-col justify-center py-10'
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
      <div>
        <div>
          <p>Importar estructura o escribela:</p>
          <Select
            id='brand'
            name='brand'
            color='text-red-200'
            // values={values?.brand as string}
            onChange={(e) => {
              console.log(e.target.value);
              setImportStructure(e.target.value);
            }}
            // placeholder={`${values && values.brand ? values.brand : 'Type brand'}`}
            options={selectOptions}
            className='border-2 border-slate-300 p-2'
          />
        </div>
        <CustomTextArea
          label=''
          error={errors.estructure?.message as string}
          // defaultValue='Escribe o importa estructura'
          value={importStructure}
          register={register}
          rules={{
            minLength: {
              value: 15,
              message: 'La descripción debe ser un poco más larga (min - 15 carácteres)',
            },
            maxLength: {
              value: 299,
              message: 'La descripción debe ser máximo de 300 carácteres',
            },
          }}
          name='descriptionCompany'
          id='descriptionCompany'
          classGeneral='mt-0'
          classTextArea='border-2 border-slate-300 px-4 py-2'
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

      <Button
        className='h-12 text-center hover:scale-110 active:scale-90 transition flex items-center text-white bg-black justify-center  w-full'
        type='submit'
      >
        Crear texto
      </Button>
    </form>
  );
};
