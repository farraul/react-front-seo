import { useState, useEffect, ChangeEvent } from 'react';
import { Headings } from 'src/models/seo/seo';
import { AnalizeSerpTemplate } from 'src/components/templates/AnalizeSerpTemplate';
import { UrlForm } from 'src/components/AnalizeSerpComponents/UrlForm';

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
        <UrlForm handleIntegrateHeadings={handleIntegrateHeadings} />
      </div>
      <AnalizeSerpTemplate titleç={title} description={description} headings={headings} />
    </div>
  );
};

export default KeywordSerp;
