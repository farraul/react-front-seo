import React from 'react';
import { Seo, SeoHeadingWithName } from 'src/models/seo';
import { v4 as uuidv4 } from 'uuid';
import InHeadingResult from './InHeadingResult';
import InHeadingShow from './InHeadingShow';

interface Props {
  droppableAreas: SeoHeadingWithName;
}

export const ResultPanel = ({ droppableAreas }: Props) => (
  <div className=' flex flex-col mt-2  h-full p-8 rounded-sm  border border-black'>
    <div className='flex items-center'>
      {droppableAreas.name ? (
        <p className='text-4xl font-bold'>{droppableAreas.name}</p>
      ) : (
        <p>[ ]</p>
      )}
      <span className='ml-4 flex items-center text-base '>H{droppableAreas.type}</span>
    </div>

    <div className='flex ml-4 items-center mb-4'>
      {Object.keys(droppableAreas.keywords).length > 0 ? (
        droppableAreas.keywords.map((keyword, indexKey) => (
          <div className='ml-2  gap-2' key={indexKey}>
            {Object.entries(keyword).map((word, index) => (
              <div className='flex gap-2' key={index}>
                {/* <span className='text-xs text-gray-200'>[{indexKey + 1}]</span> */}
                <span>{word[0]}, </span>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className='flex items-center ml-4'>
          <span className='text-xs text-gray-100'></span>
        </div>
      )}

      {/* <div className='flex justify-between items-center w-36 ml-8 text-base'>
        <div className='capitalize text-gray-200 w-36'>keywords</div>
      </div> */}
    </div>
    <div className='flex ml-4 '>
      <div>
        {droppableAreas.headings.length > 0 ? (
          droppableAreas.headings.map((heading, index) => (
            <div className='ml-2 flex items-center gap-2' key={index}>
              <InHeadingShow key={heading.name} heading={heading} />
            </div>
          ))
        ) : (
          <div className='flex items-center ml-4'>
            <span className='text-xs text-gray-100'></span>
          </div>
        )}
      </div>
      {/* <div className='flex items-center justify-between w-36'>
        <div className='h-full flex'>
          <div className=' text-gray-200 w-20 flex items-center  justify-end'>
            H{droppableAreas.type + 1}
          </div>
        </div>
      </div> */}
    </div>
  </div>
);
