import React, { useState } from 'react';
import { RegisterOptions, UseFormRegisterReturn, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import intentionsStub from 'src/stub/intentionsStub.json';
import structuresStub from 'src/stub/structuresStub.json';
// components
import { ConstructionPanel } from 'src/components/Structure/Panels/ConstructionPanel';
import { ResultPanel } from 'src/components/Structure/Panels/ResultPanel';
import { Button, CustomInput } from 'src/components/PrimitiveElements';
// utils
import { findHeading, handleDragOver, handleDragStart } from 'src/utilities/dragAndDropHelper';
import { SeoHeadingWithName } from 'src/models/seo';

const initialState: any = {
  tiele: '',
  metaDescription: '',
};

const estructure: SeoHeadingWithName = {
  name: 'Seo',
  headings: [],
  keywords: [],
  type: 1,
};

const StructurePage = () => {
  const [structureSelected, setStructureSelected] = useState<any>();
  const [isOpenEditKeyword, setIsOpenEditKeyword] = useState<any>(false);
  const [isOpenCreateIntention, setIsOpenCreateIntention] = useState(false);

  const showStructure = (intention: string) => {
    setStructureSelected(intention);
  };

  const [words, setWords] = useState([
    'Que es el seo?',
    'Seo para empresas',
    'Seo España',
    'Inicio para el seo',
  ]);
  const [droppableAreas, setDroppableAreas] = useState<any>(estructure);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: initialState,
  });

  const handleDropKeyword = (
    event: React.DragEvent<HTMLElement>,
    name: string,
    type: number,
    keyword: Record<string, number>[],
  ) => {
    const word = event.dataTransfer.getData('word');
    console.log(name, type, keyword, word);
    const headingDeterminated = findHeading(estructure, name, type);
    if (headingDeterminated) {
      console.log(headingDeterminated);
      // stub strong in keyword
      const dataKeyword = {
        [word]: 100,
      };
      headingDeterminated.keywords.push(dataKeyword);
      console.log(headingDeterminated);
    }
    setDroppableAreas((prevState: { headings: SeoHeadingWithName[] }) => {
      const updatedHeadings = replaceKeyword(prevState.headings, name, type, word);
      return {
        ...prevState,
        headings: updatedHeadings,
      };
    });
  };

  const handleDropHeading = (
    event: React.DragEvent<HTMLElement>,
    type: number,
    heading: SeoHeadingWithName,
  ) => {
    if (type === 6) return;
    const word = event.dataTransfer.getData('word');
    const newDataHeading: SeoHeadingWithName = {
      name: word,
      type: type + 1,
      headings: [],
      keywords: [],
    };
    heading.headings.push(newDataHeading);
    setDroppableAreas((prevState) => {
      return {
        ...prevState,
        heading,
      };
    });
  };

  const replaceKeyword = (
    headings: SeoHeadingWithName[],
    name: string,
    type: number,
    word: string,
  ): SeoHeadingWithName[] => {
    return headings.map((heading) => {
      if (heading.name === name && heading.type === type) {
        const updatedKeywords = [...heading.keywords, { [word]: 100 }];
        return {
          ...heading,
          keywords: updatedKeywords,
        };
      }
      return {
        ...heading,
        headings: replaceKeyword(heading.headings, name, type, word),
      };
    });
  };

  return (
    <article className='mb-32'>
      <section className='px-20'>
        <div className=' mb-16 mt-20 flex items-center flex-col justify-cente'>
          <h1 className='heading-h1'>Estructuras</h1>
          {/* <p className='mt-5 text-xl'>Selecciona la inteción que quieras revisar</p> */}
        </div>
        <div className=' flex  flex-row flex-wrap gap-x-2 gap-y-2'>
          {Object.entries(estructure).map(([intention, vol]) => (
            <div key={intention}>
              {droppableAreas[intention] && (
                <div className=''>
                  <Button
                    className='bg-primary w-72 h-20 flex  items-center justify-center rounded-2xl flex-col text-xl text-white'
                    onClick={() => showStructure(intention)}
                  >
                    {intention}
                  </Button>
                </div>
              )}
            </div>
          ))}
          <div key='one'>
            <Button
              className='bg-gray-200 border-gray-500 border-2 w-72 h-20 flex  items-center justify-center rounded-2xl flex-col text-xl text-black border-dashed'
              onClick={() => {
                setIsOpenCreateIntention(true);
              }}
            >
              Nueva Estructura
            </Button>
          </div>
        </div>
      </section>

      <section>
        {structureSelected ? (
          <>
            <div className='mt-16 mb-1 flex'>
              <div className='w-1/2'>
                {/* <h1 className='font-bold text-2xl mb-6'>HTML </h1> */}
                <p className='mb-8'>Pincha y arrastra las palabras:</p>
                {words.map((word) => {
                  return (
                    <span
                      className='border-2 ml-4 py-2 px-4'
                      onDragStart={(event) => handleDragStart(event, word)}
                      draggable
                    >
                      <span className=''>{word}</span>
                    </span>
                  );
                })}
                <ConstructionPanel
                  droppableAreas={droppableAreas}
                  handleDragOver={handleDragOver}
                  handleDropKeyword={handleDropKeyword}
                  handleDropHeading={handleDropHeading}
                />
              </div>
              <div className='w-full max-w-lg'>
                <ResultPanel droppableAreas={droppableAreas} />
              </div>
            </div>
            {/* TODO: Refactor extract */}
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
          </>
        ) : null}
      </section>
    </article>
  );
};

export default StructurePage;
