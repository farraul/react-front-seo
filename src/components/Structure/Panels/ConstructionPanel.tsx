import React from 'react';
import { Seo, SeoHeadingWithName } from 'src/models/seo';
import { v4 as uuidv4 } from 'uuid';
import InHeadingConstruction from './InHeadingConstruction';
import ButtonAddForDrag from './ButtonAddForDrag';

interface Props {
  droppableAreas: SeoHeadingWithName;
  handleDragOver: (event: React.DragEvent<HTMLElement>) => void;
  handleDropKeyword: (
    event: React.DragEvent<HTMLElement>,
    name: string,
    type: number,
    keyword: Record<string, number>[],
  ) => void;
  handleDropHeading: (
    event: React.DragEvent<HTMLElement>,
    type: number,
    heading: SeoHeadingWithName,
  ) => void;
}

export const ConstructionPanel = ({
  droppableAreas,
  handleDragOver,
  handleDropKeyword,
  handleDropHeading,
}: Props) => (
  <div className='bg-blue-600 px-4 py-5 text-white rounded-md mt-2'>
    <div className=' flex flex-col mt-2'>
      <div className='flex items-center'>
        {droppableAreas.name ? <p>{droppableAreas.name}</p> : <p>[ ]</p>}
        <span className='font-bold text-gray-400 ml-5 flex items-center '>
          H{droppableAreas.type}:
        </span>
      </div>

      <div className='flex ml-4 items-center mb-4'>
        <div className='flex justify-between items-center w-36'>
          <span className='capitalize text-gray-200 font-semibold'>keywords</span>
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
            <div className='ml-2 flex items-center gap-2' key={indexKey}>
              {Object.entries(keyword).map((word, index) => (
                <div className='flex gap-2' key={index}>
                  <span className='text-xs text-gray-200'>[{indexKey + 1}]</span>
                  <span>{word[0]}</span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className='flex items-center ml-4'>
            <span className='text-xs text-gray-100'>'N/A'</span>
          </div>
        )}
      </div>
      <div className='flex ml-4 items-center'>
        <div className='flex items-center justify-between w-36'>
          <span className='capitalize text-gray-200 font-semibold'>H{droppableAreas.type + 1}</span>
          <ButtonAddForDrag
            name={droppableAreas.name}
            type={droppableAreas.type}
            keyword={droppableAreas.keywords}
            handleDragOver={handleDragOver}
            handleDrop={handleDropHeading}
            heading={droppableAreas}
          />
        </div>
        {droppableAreas.headings.length > 0 ? (
          droppableAreas.headings.map((heading, index) => (
            <div className='ml-2 flex items-center gap-2' key={index}>
              <span>{heading.name}</span>
            </div>
          ))
        ) : (
          <div className='flex items-center ml-4'>
            <span className='text-xs text-gray-100'>'N/A'</span>
          </div>
        )}
      </div>
    </div>
    {droppableAreas.headings.map((heading) => (
      <InHeadingConstruction
        handleDragOver={handleDragOver}
        handleDropKeyword={handleDropKeyword}
        handleDropHeading={handleDropHeading}
        key={heading.name}
        heading={heading}
      />
    ))}
  </div>
);
