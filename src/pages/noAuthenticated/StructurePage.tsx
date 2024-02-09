import React, { useState } from 'react';
import { ConstructionPanel } from 'src/components/Structure/Panels/ConstructionPanel';
import { ResultPanel } from 'src/components/Structure/Panels/ResultPanel';
import { v4 as uuidv4 } from 'uuid';
import intentionsStub from 'src/stub/intentionsStub.json';
import structuresStub from 'src/stub/structuresStub.json';

import { Button, CustomInput } from 'src/components/PrimitiveElements';
import { RegisterOptions, UseFormRegisterReturn, useForm } from 'react-hook-form';

const initialState: any = {
  tiele: '',
  metaDescription: '',
};
const estructure = structuresStub;
const StructurePage = () => {
  const [structures, setStructures] = useState<any>(intentionsStub);
  const [structureSelected, setStructureSelected] = useState<any>();
  const [isOpenEditKeyword, setIsOpenEditKeyword] = useState<any>(false);
  const [isOpenCreateIntention, setIsOpenCreateIntention] = useState(false);

  const showStructure = (intention: string) => {
    console.log({ intention });
    setStructureSelected(intention);
  };

  const [words, setWords] = useState([
    'Que es el seo?',
    'Seo para empresas',
    'Seo España',
    'Inicio para el seo',
  ]);
  const [droppableAreas, setDroppableAreas] = useState<any>(estructure);
  console.log('EstructurePage  droppableAreas:', droppableAreas);

  const handleDragStart = (event: any, word: any) => {
    event.dataTransfer.setData('word', word);
  };
  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDropKeyword = (event: any, tag: any) => {
    const word = event.dataTransfer.getData('word');
    const wordIndex = words.indexOf(word);

    if (wordIndex !== -1) {
      const newWords = [...words];
      newWords.splice(wordIndex, 1);
      setWords(newWords);

      const template = { ...droppableAreas[tag]['keywords'], [word]: {} };

      const templateEmpty = ({ headings = {}, keywords = {}, type }: any) => {
        return { headings, keywords, type };
      };

      setDroppableAreas((prevState: any) => ({
        ...prevState,
        [tag]: {
          ...prevState[tag],
          ['keywords']: {
            ...template,
          },
        },
      }));
    }
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
  const handleDropHeading = (event: any, tag: any, type: any, route: any) => {
    const word = event.dataTransfer.getData('word');

    console.log('tag:', tag);
    console.log('word', word);
    console.log('word', type);
    console.log(route);

    const wordIndex = words.indexOf(word);

    if (wordIndex !== -1) {
      const newWords = [...words];
      newWords.splice(wordIndex, 1);
      setWords(newWords);
      console.log('in');

      const templates = () => {
        console.log(droppableAreas[tag]['headings'][word]);
        // console.log(droppableAreas[tag]['headings'][word].length);
        if (droppableAreas[tag]['headings'].word == undefined) {
          console.log('handleDrop  word:', word);
          return { headings: {}, keywords: {}, type: type + 1 };
        } else {
          console.log(droppableAreas[tag]['headings'][word].length);
        }
      };

      console.log('handleDrop  word:', word);
      setDroppableAreas((prevState: any) => ({
        ...prevState,
        [tag]: {
          ...prevState[tag],
          ['headings']: {
            ...prevState[tag]['headings'],
            [word]: templates,
          },
        },
      }));
      console.log(droppableAreas);
    }
  };

  const findValue = (obj: any, key: any) => {
    const stack = [{ obj, path: [] }];

    while (stack.length > 0) {
      const { obj, path } = stack.pop();

      for (let k in obj) {
        const newPath = [...path, k];

        if (k === key && Object.keys(obj[k]).length !== 0) {
          console.log(newPath.join(' -> '), obj[k]);
        }

        if (typeof obj[k] === 'object' && obj[k] !== null) {
          stack.push({ obj: obj[k], path: newPath });
        }
      }
    }
  };

  findValue(estructure, 'keywords');

  return (
    <article className='mb-32'>
      <section className='px-20'>
        <div className=' mb-16 mt-20 flex items-center flex-col justify-cente'>
          <h1 className=' text-4xl font-bold  text-primary-generic'>Estructuras</h1>
          {/* <p className='mt-5 text-xl'>Selecciona la inteción que quieras revisar</p> */}
        </div>
        <div className=' flex  flex-row flex-wrap gap-x-2 gap-y-2'>
          {Object.entries(estructure).map(([intention, vol]) => {
            return (
              <div key={intention}>
                <div>
                  {structures[intention] && (
                    <div className=''>
                      <div>
                        <div>
                          <Button
                            className='bg-primary w-72 h-20 flex  items-center justify-center rounded-2xl flex-col text-xl text-white'
                            onClick={() => showStructure(intention)}
                          >
                            {intention}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div key='one'>
            <div>
              <div className=''>
                <div>
                  <div>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        {structureSelected ? (
          <div className='mt-16 mb-1'>
            <div className='w-1/2'>
              <h1 className='font-bold text-2xl mb-6'>HTML </h1>
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
                    className='border-2 border-slate-200 border-solid  p-2 color-black  text-sm w-full text-sm'
                  />
                </div>
              </div>
            </div>

            <div className='w-1/2'>{/* <PanelResult droppableAreas={droppableAreas} /> */}</div>
          </div>
        ) : null}
      </section>
    </article>
  );
};

export default StructurePage;
