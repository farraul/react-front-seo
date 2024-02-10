import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { Headings, urlSeo } from 'src/models/seo/seo';
import { Input } from 'src/components/ui/input';
import { Button, CustomInput } from 'src/components/PrimitiveElements';
import { RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from 'react-hook-form';
import { getAnalyseUrlSeo } from 'src/services/seo';
import { ListItem, ListItemText, ListSubheader } from '@mui/material';
import { Form } from 'src/components/AnalizeSerp/form';
import { AnalizeSerpTemplate } from 'src/components/templates/AnalizeSerpTemplate';

const KeywordSerp = () => {
  const [headings, setHeadings] = useState<Headings[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [countLinks, setCountLinks] = useState();

  const handleIntegrateHeadings = (headings: any, data: any) => {
    setHeadings(headings);
    setTitle(data.title);
    setDescription(data.description);
    setCountLinks(data.links.length);
  };

  return (
    <div className='flex'>
      <div className='w-1/2 p-24'>
        <h1 className=''> Analizar competencia</h1>
        <Form handleIntegrateHeadings={handleIntegrateHeadings} />
      </div>
      <AnalizeSerpTemplate titleç={title} description={description} headings={headings} />
    </div>
  );
};

export default KeywordSerp;
