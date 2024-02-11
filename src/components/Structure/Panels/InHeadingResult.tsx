import React from 'react';
import { SeoHeadingWithName } from 'src/models/seo';
import ButtonAddForDrag from './ButtonAddForDrag';

interface Props {
  heading: SeoHeadingWithName;
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

const InHeadingResult = ({ heading }: any) => {
  console.log('InHeadingShow  heading:', heading.type);

  return (
    <div className=' px-4 '>
      <div className=' flex flex-col mt-2'>
        <div className='flex gap-2 items-center'>
          <p
            className={`font-bold ${
              heading.type === 2 ? 'text-2xl' : heading.type === 3 ? 'text-xl' : 'text-text-base'
            }`}
          >
            {heading.name}
          </p>
          <span className={`ml-5 `}>H{heading.type}</span>
          <span className='font-bold ml-4 flex items-center '></span>
        </div>
        <div className='ml-10 pt-2'>
          <div className='flex justify-between items-center w-fit '>
            {/* <div className='flex item'>
              <span className='capitalize text-gray-900 text-sm italic w-16'>keywords</span>
            </div> */}
            <div className='flex'>
              {Object.keys(heading.keywords).length > 0 ? (
                heading.keywords.map((keyword, indexKey) => (
                  <div className='ml-2 flex items-center gap-2 w-full' key={indexKey}>
                    {Object.entries(keyword).map((word, index) => (
                      <div className='flex gap-2 w-full' key={index}>
                        {/* <span className='text-xs text-gray-200'>[{indexKey + 1}]</span> */}
                        <span className='w-max'>{word[0]}, </span>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div className='flex items-center ml-4 '>
                  <span className='text-xs '></span>
                </div>
              )}
            </div>
          </div>
          <div className='flex  mt-2'>
            <div>
              {heading.headings.length > 0 ? (
                heading.headings.map((newHeading, index) => (
                  <div className='ml-2 flex items-center gap-2' key={index}>
                    <span>
                      <InHeadingResult key={index} heading={newHeading} />
                    </span>
                  </div>
                ))
              ) : (
                <div className='flex items-center ml-4'>
                  <span className='text-xs text-gray-700'></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InHeadingResult;
