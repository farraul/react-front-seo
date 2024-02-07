import React, { useState } from 'react';
import { PanelConstruction } from 'src/components/Estructure/PanelConstruction';
import { PanelResult } from 'src/components/Estructure/PanelResult';
import { v4 as uuidv4 } from 'uuid';

const estructure = {
  Seo: {
    headings: {
      'Seo local': {
        headings: {
          'Seo local valencia': {
            headings: {
              'Seo local valencia ahora': {
                headings: {
                  'seo local valencia ahora mismo': {
                    headings: {
                      'Seo local valencia ahora': {
                        headings: {
                          headings: {},
                          keywords: { 'Seo local': 100 },
                          type: 7,
                        },
                      },
                      keywords: { 'Seo local': 100 },
                      type: 6,
                    },
                  },
                },
                keywords: { 'Seo local': 100 },
                type: 5,
              },
              keywords: { 'Seo local': 200 },
              type: 4,
            },
            keywords: { 'Seo local': 300 },
            type: 3,
          },
        },
        keywords: {},
        type: 2,
      },
      'Seo online': { headings: {}, keywords: {}, type: 2 },
      'Seo presencial': { headings: {}, keywords: {}, type: 2 },
    },
    keywords: { 'Seo local keyword': 400 },
    type: 1,
  },
};
const EstructurePage = () => {
  console.log('in');

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
    <section>
      <div className='mt-16 mb-1 flex'>
        <div className='w-1/2'>
          <h1 className='font-bold text-3xl mb-6'> Nuevas palabras </h1>
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

          <PanelConstruction
            droppableAreas={droppableAreas}
            handleDragOver={handleDragOver}
            handleDropKeyword={handleDropKeyword}
            handleDropHeading={handleDropHeading}
          />
        </div>

        <div className='w-1/2'>{/* <PanelResult droppableAreas={droppableAreas} /> */}</div>
      </div>
    </section>
  );
};

export default EstructurePage;
