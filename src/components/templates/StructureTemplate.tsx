import React, { useState } from 'react';
import { SeoHeadingWithName } from 'src/models/seo';
import { findKeyword } from 'src/utilities/dragAndDropHelper';
import { useForm } from 'react-hook-form';
import { ListKeywordsToDrag } from '../StructureComponents/Panels/ConstructionPanel/DragAndDrop/ListKeywordsToDrag';
import { ConstructionPanel } from '../StructureComponents/Panels/ConstructionPanel/ConstructionPanel';
import { MetaDataPanel } from '../StructureComponents/Panels/MetaDataPanel';
import { ResultPanel } from '../StructureComponents/Panels/ResultPanel';

export const StructureTemplate = ({
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

  const searchHeadingAndAddKewyord = (
    headings: SeoHeadingWithName[],
    name: string,
    type: number,
    word: string,
  ): SeoHeadingWithName[] => {
    console.log(headings);

    return headings.map((heading) => {
      if (heading.name === name && heading.type === type) {
        const updatedKeywords = [...heading.keywords, { [`${word}`]: 100 }];

        return {
          ...heading,
          keywords: updatedKeywords,
        };
      } else {
        return {
          ...heading,
          headings: searchHeadingAndAddKewyord(heading.headings, name, type, `${word}`),
        };
      }
    });
  };

  const handleDropKeyword = (event: React.DragEvent<HTMLElement>, name: string, type: number) => {
    const word = event.dataTransfer.getData('word');
    const headingDeterminated = findKeyword(droppableAreas, name, type);
    let isRepeat = false;

    if (headingDeterminated) {
      headingDeterminated.keywords.findIndex((KeywordIn) =>
        Object.keys(KeywordIn).forEach((keywordInKey) => {
          if (keywordInKey === word) {
            isRepeat = true;
          }
        }),
      );

      if (!isRepeat) {
        const dataKeyword = {
          [word]: 100,
        };

        if (type == 1) {
          headingDeterminated.keywords.push(dataKeyword);
        } else {
          isRepeat = true;
        }
        const keywordsUpdated = searchHeadingAndAddKewyord(
          droppableAreas.headings,
          name,
          type,
          word,
        );
        setDroppableAreas((prevState: any) => {
          return {
            ...prevState,
            headings: keywordsUpdated,
          };
        });
      }
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
    const isHeadingDuplicate = heading.headings.findIndex((headingObj) => headingObj.name === word);

    if (isHeadingDuplicate >= 0) return;
    const newDataHeading: SeoHeadingWithName = {
      name: word,
      type: type + 1,
      headings: [],
      keywords: [],
    };
    const addHeading = heading.headings.push(newDataHeading);
    setDroppableAreas((prevState: any) => {
      return {
        ...prevState,
        kewyordAdded: addHeading,
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
