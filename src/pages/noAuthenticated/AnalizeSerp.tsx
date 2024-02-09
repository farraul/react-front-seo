import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { Headings, urlSeo } from 'src/models/seo/seo';
import { Input } from 'src/components/ui/input';
import { Button, CustomInput } from 'src/components/PrimitiveElements';
import { RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from 'react-hook-form';
import { getAnalyseUrlSeo } from 'src/services/seo';
import { ListItem, ListItemText, ListSubheader } from '@mui/material';

const initialState: any = {
  url: '',
};

const KeywordSerp = () => {
  const [url, setUrl] = useState('');
  const [headings, setHeadings] = useState<Headings[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [countLinks, setCountLinks] = useState();

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

      setHeadings(headings);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setCountLinks(response.data.links.length);
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
            Analizar Url
          </Button>
        </form>
      </div>
      <div className='w-1/2 p-24'>
        {title ? (
          <>
            <div className='py-4 px-2 bg-violet-300 '>Title</div>
            <div className='py-4'>{title}</div>
          </>
        ) : null}
        {description ? (
          <>
            <div className='py-4 px-2 bg-violet-300 '>Meta-description</div>
            <div className='py-4'>{description}</div>
          </>
        ) : null}
        {headings.map((heading) => {
          const singleKey = Object.keys(heading)[0] as keyof Headings;
          return (
            <>
              <div key={`section-${heading}`}>
                <div>
                  <ListSubheader sx={{ bgcolor: '#bfbff1', color: 'black' }}>
                    {Object.keys(heading)[0]}
                  </ListSubheader>

                  <ListItem
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 0,
                      margin: 0,
                    }}
                    key={`item-${Object.keys(heading)[0]}-list`}
                  >
                    {heading[singleKey].map((e) => {
                      return (
                        <ListItemText
                          sx={{
                            borderTop: 1,
                            borderColor: 'grey.500',
                            width: '100%',
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingLeft: 2,
                            paddingRight: 2,
                            margin: 0,
                          }}
                          primary={e}
                        />
                      );
                    })}
                  </ListItem>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default KeywordSerp;
