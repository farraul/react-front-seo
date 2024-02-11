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
  <div className='bg-blue-600 px-8 py-10 text-white rounded-md  pl-10 mt-10'>
    <div className=' flex flex-col mt-2'>
      <div className='flex items-center'>
        <span className='mr-5 flex items-center text-xl '>H{droppableAreas.type}:</span>
        {droppableAreas.name ? <p>{droppableAreas.name}</p> : <p>[ ]</p>}
      </div>

      <div className='flex ml-4 items-center mb-4'>
        <div className='flex justify-between items-center w-36'>
          <div className='capitalize text-gray-200 font-semibold w-36'>keywords</div>
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
                  <span>{word[0]} |</span>
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
      <div className='flex ml-4 '>
        <div className='flex items-center justify-between w-36'>
          <div className='h-full flex'>
            <div className=' text-gray-200 w-20 flex items-center  justify-end'>
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
              <span className='text-xs text-gray-100'>'N/A'</span>
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
