import React, { useState } from 'react';
import { ConstructionPanel } from '../Structure/Panels/ConstructionPanel/ConstructionPanel';
import { CustomInput } from '../PrimitiveElements';
import { SeoHeadingWithName } from 'src/models/seo';
import {
  findHeading,
  findKeyword,
  handleDragOver,
  handleDragStart,
} from 'src/utilities/dragAndDropHelper';
import { useForm } from 'react-hook-form';
import { ResultPanel } from '../Structure/Panels/ResultPanel';
import { ListKeywordsToDrag } from '../Structure/Panels/ConstructionPanel/DragAndDrop/ListKeywordsToDrag';
import { MetaDataPanel } from '../Structure/Panels/MetaDataPanel';

export const StructureTemplate = ({
  estructure,
  structureSelected,
  droppableAreas,
  setDroppableAreas,
}: any) => {
  const [words, setWords] = useState([
    'Que es el seo?',
    'Seo para empresas en valencia',
    'Seo España',
    'Inicio para el seo',
  ]);

  const replaceKeyword = (
    headings: SeoHeadingWithName[],
    name: string,
    type: number,
    word: string,
  ): SeoHeadingWithName[] => {
    return headings.map((heading) => {
      console.log(heading);

      if (heading.name === name && heading.type === type) {
        console.log(word);
        console.log(heading.keywords);
        const updatedKeywords = [...heading.keywords, { [word]: 100 }];
        console.log('returnheadings.map  updatedKeywords:', updatedKeywords);

        return {
          ...heading,
          keywords: updatedKeywords,
        };
      } else {
        console.log(word);
        return {
          ...heading,
          headings: replaceKeyword(heading.headings, name, type, word),
        };
      }
    });
  };
  const handleDropKeyword = (
    event: React.DragEvent<HTMLElement>,
    name: string,
    type: number,
    heading: any,
    keyword: Record<string, number>[],
  ) => {
    const word = event.dataTransfer.getData('word');
    console.log('word:', word);
    console.log(name);
    console.log(type);
    console.log(heading);
    console.log(keyword);

    const headingDeterminated = findKeyword(droppableAreas, name, type);
    console.log('estructure:', estructure);
    console.log('type:', type);
    console.log('name:', name);

    console.log('headingDeterminated:', headingDeterminated);

    let isRepeat = false;
    if (headingDeterminated) {
      headingDeterminated.keywords.findIndex((KeywordIn) =>
        Object.keys(KeywordIn).forEach((keywordInKey) => {
          console.log(keywordInKey);
          console.log(word);

          if (keywordInKey === word) isRepeat = true;
        }),
      );
      if (!isRepeat) {
        console.log('in');
        const dataKeyword = {
          [word]: 100,
        };

        headingDeterminated.keywords.push(dataKeyword);
      }
    }
    if (!isRepeat) {
      console.log(isRepeat);
      console.log(droppableAreas);
      setDroppableAreas((prevState: { headings: SeoHeadingWithName[] }) => {
        const updatedHeadings = replaceKeyword(prevState.headings, name, type, word);
        console.log('setDroppableAreas  updatedHeadings:', updatedHeadings);

        return {
          ...prevState,
          headings: updatedHeadings,
        };
      });
      console.log(droppableAreas);
    }
  };

  const handleDropHeading = (
    event: React.DragEvent<HTMLElement>,
    type: number,
    heading: SeoHeadingWithName,
  ) => {
    console.log('heading:', heading);

    if (type === 5) return;
    const word = event.dataTransfer.getData('word');

    const newDataHeading: SeoHeadingWithName = {
      name: word,
      type: type + 1,
      headings: [],
      keywords: [],
    };

    const nameIndex = heading.headings.findIndex((headingObj) => headingObj.name === word);

    if (nameIndex >= 0) return;

    heading.headings.push(newDataHeading);
    setDroppableAreas((prevState: any) => {
      return {
        ...prevState,
        heading,
      };
    });
  };

  return (
    <>
      {structureSelected ? (
        <>
          <section>
            <ListKeywordsToDrag words={words} />
          </section>
          <section>
            <>
              <div className='mt-16 mb-1 flex gap-x-4'>
                <div className='w-2/3'>
                  {/* <h1 className='font-bold text-2xl mb-6'>HTML </h1> */}
                  <ConstructionPanel
                    droppableAreas={droppableAreas}
                    handleDragOver={handleDragOver}
                    handleDropKeyword={handleDropKeyword}
                    handleDropHeading={handleDropHeading}
                  />
                  <MetaDataPanel />
                </div>
                <div className='w-1/3'>
                  <ResultPanel droppableAreas={droppableAreas} />
                </div>
              </div>
              {/* TODO: Refactor extract */}
            </>
          </section>
        </>
      ) : null}
    </>
  );
};
