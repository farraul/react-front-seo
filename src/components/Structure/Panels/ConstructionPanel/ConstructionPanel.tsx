import React from 'react';
import { Seo, SeoHeadingWithName } from 'src/models/seo';
import { v4 as uuidv4 } from 'uuid';
import InHeadingConstruction from './DragAndDrop/InHeadingConstruction';
import ButtonAddForDrag from './DragAndDrop/ButtonAddForDrag';
import { handleDragOver } from 'src/utilities/dragAndDropHelper';

interface Props {
  droppableAreas: SeoHeadingWithName;
  // handleDragOver: (event: React.DragEvent<HTMLElement>) => void;
  handleDropKeyword: (
    event: React.DragEvent<HTMLElement>,
    name: string,
    type: number,
    keyword: Record<string, number>[],
    heading: any,
  ) => void;
  handleDropHeading: (
    event: React.DragEvent<HTMLElement>,
    type: number,
    heading: SeoHeadingWithName,
  ) => void;
}

export const ConstructionPanel = ({
  droppableAreas,
  handleDropKeyword,
  handleDropHeading,
}: Props) => {
  console.log(droppableAreas);

  return (
    <div className='bg-gray-100 px-8 py-10 pl-10'>
      <div className=' flex flex-col mt-2'>
        <div className='flex items-center'>
          <span className='mr-5 flex items-center text-xl text-green-800 font-bold '>
            H{droppableAreas.type}
          </span>
          <span className='text-blue-700 text-xl'>
            {droppableAreas.name ? <p>{droppableAreas.name}</p> : <p>[ ]</p>}
          </span>
        </div>

        <div className='flex ml-4 items-center mb-4'>
          <div className='flex justify-between items-center w-36'>
            <div className='capitalize   w-36 text-green-800 font-bold'>keywords</div>
            <ButtonAddForDrag
              name={droppableAreas.name}
              type={droppableAreas.type}
              keyword={droppableAreas.keywords}
              handleDragOver={handleDragOver}
              handleDrop={handleDropKeyword}
            />
          </div>

          {Object.keys(droppableAreas.keywords).length > 0 ? (
            droppableAreas.keywords.map((keyword, indexKey) => (
              <div className='ml-2  gap-2' key={indexKey}>
                {Object.entries(keyword).map((word, index) => (
                  <div className='flex gap-2' key={index}>
                    {/* <span className='text-xs text-gray-200'>[{indexKey + 1}]</span> */}
                    <span className='text-blue-700'>{word[0]}, </span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className='flex items-center ml-4'>
              <span className='text-xs text-gray-100'></span>
            </div>
          )}
        </div>
        <div className='flex ml-4 '>
          <div className='flex items-center justify-between w-36'>
            <div className='h-full flex'>
              <div className='  w-20 flex items-center  justify-end text-green-800 font-bold'>
                H{droppableAreas.type + 1}
              </div>
              <ButtonAddForDrag
                name={droppableAreas.name}
                type={droppableAreas.type}
                keyword={droppableAreas.keywords}
                handleDragOver={handleDragOver}
                handleDrop={handleDropHeading}
                heading={droppableAreas}
              />
            </div>
          </div>
          <div>
            {droppableAreas.headings.length > 0 ? (
              droppableAreas.headings.map((heading, index) => (
                <div className='ml-2 flex items-center gap-2' key={index}>
                  <InHeadingConstruction
                    handleDragOver={handleDragOver}
                    handleDropKeyword={handleDropKeyword}
                    handleDropHeading={handleDropHeading}
                    key={heading.name}
                    heading={heading}
                  />
                </div>
              ))
            ) : (
              <div className='flex items-center ml-4'>
                <span className='text-xs '></span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* {droppableAreas.headings.map((heading) => (
      <InHeadingConstruction
        handleDragOver={handleDragOver}
        handleDropKeyword={handleDropKeyword}
        handleDropHeading={handleDropHeading}
        key={heading.name}
        heading={heading}
      />
    ))} */}
    </div>
  );
};
