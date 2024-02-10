import React, { useState } from 'react';
import { PanelConstruction } from 'src/components/Estructure/PanelConstruction';
import { PanelResult } from 'src/components/Estructure/PanelResult';
import { SeoHeadingWithName } from 'src/models/seo';
import { handleDragStart, handleDragOver, findHeading } from 'src/utilities/dragAndDropHelper';
import { v4 as uuidv4 } from 'uuid';

const estructure: SeoHeadingWithName = {
  name: 'Seo',
  headings: [],
  keywords: [],
  type: 1,
};

const EstructurePage = () => {
  const [words, setWords] = useState([
    'Que es el seo?',
    'Seo para empresas',
    'Seo España',
    'Inicio para el seo',
  ]);
  const [droppableAreas, setDroppableAreas] = useState<SeoHeadingWithName>(estructure);

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
    setDroppableAreas((prevState) => {
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
    <section className='flex justify-between'>
      <div className='mt-16 mb-1 flex flex-col w-full'>
        <div className='w-full flex gap-2 whitespace-pre-wrap flex-col'>
          <div className='flex flex-col'>
            <h1 className='font-bold text-3xl mb-6'> Nuevas palabras </h1>
            <p className='mb-8'>Pincha y arrastra las palabras:</p>
          </div>
          <div className='w-full flex '>
            {words.map((word, index) => {
              return (
                <span
                  key={index}
                  className='border-2 ml-4 text-xs py-2 px-4 w-fit'
                  onDragStart={(event) => handleDragStart(event, word)}
                  draggable
                >
                  <span className=''>{word}</span>
                </span>
              );
            })}
          </div>
        </div>
        <PanelConstruction
          droppableAreas={droppableAreas}
          handleDragOver={handleDragOver}
          handleDropKeyword={handleDropKeyword}
          handleDropHeading={handleDropHeading}
        />
      </div>
      <div className='w-full max-w-lg'>
        <PanelResult droppableAreas={droppableAreas} />
      </div>
    </section>
  );
};

export default EstructurePage;
