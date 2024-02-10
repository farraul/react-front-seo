import React from 'react';
import { Seo, SeoHeadingWithName } from 'src/models/seo';
import { v4 as uuidv4 } from 'uuid';
import InHeadingResult from './InHeadingResult';

interface Props {
  droppableAreas: SeoHeadingWithName;
}

export const PanelResult = ({ droppableAreas }: Props) => (
  <div className='border-black border-4 mx-20 rounded-sm p-20 w-full'>
    <div className='mt-6 ml-6 p-2 text-2xl flex flex-col'>
      <span className='font-semibold'>{droppableAreas.name}:</span>
      <span className='text-gray-400 ml-5 text-3xl'>H{droppableAreas.type}</span>
      <div className='flex gap-2 text-base text-gray-500'>
        {droppableAreas.keywords.map((keyword, index) => (
          <div key={index}>
            {Object.entries(keyword).map((word, index) => (
              <div className='flex gap-2' key={index}>
                <span>{word[0]}:</span>
                <span className='font-semibold'>{word[1]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {droppableAreas.headings.map((heading) => (
        <div className='flex flex-col gap-2 ml-4'>
          <InHeadingResult heading={heading} />
        </div>
      ))}
    </div>
  </div>
);
