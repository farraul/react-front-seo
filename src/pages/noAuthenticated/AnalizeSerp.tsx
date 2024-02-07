import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { Headings, urlSeo } from 'src/models/seo/seo';
import { Input } from 'src/components/ui/input';
import { Button, CustomInput } from 'src/components/PrimitiveElements';
import { RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from 'react-hook-form';
import { getAnalyseUrlSeo } from 'src/services/seo';

const initialState: any = {
  url: '',
};

const KeywordSerp = () => {
  const [url, setUrl] = useState('');
  const [headings, setHeadings] = useState<Headings[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [countLinks, setCountLinks] = useState();
  const [urlsRecent, setUrlsRecent] = useState<string[]>([]);

  const [results, setResults] = useState<any>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const urlSeoValue = e.target.value as urlSeo;
    setUrl(urlSeoValue);
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

  const onSubmit: SubmitHandler<any> = async (value) => {
    console.log({ value });
    try {
      const response = await getAnalyseUrlSeo(url);

      const headings: Headings[] = [];

      for (let i = 0; i <= 6; i++) {
        if (response.data[`h${i}`]?.length) {
          headings.push({ [`h${i}`]: response.data[`h${i}`] });
        }
      }

      setHeadings(headings);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setCountLinks(response.data.links.length);

      if (!urlsRecent.includes(url)) {
        if (_id) createUrlsSeo(_id, url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex'>
      <div className='w-1/2 p-24'>
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
            Crear texto
          </Button>
        </form>
      </div>
    </div>
  );
};

export default KeywordSerp;
