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

const InHeadingConstruction = ({
  heading,
  handleDragOver,
  handleDropKeyword,
  handleDropHeading,
}: Props) => {
  return (
    <div className='bg-blue-600 px-5 py-4 text-white rounded-md mt-2'>
      <div className=' flex flex-col mt-2'>
        <div className='flex gap-2 items-center'>
          <p>{heading.name}</p>
          <span className='font-bold text-gray-400 ml-5 flex items-center '>H{heading.type}</span>
        </div>

        <div className='flex justify-between items-center w-36'>
          <span className='capitalize text-gray-200 font-semibold'>keywords</span>
          <ButtonAddForDrag
            name={heading.name}
            type={heading.type}
            keyword={heading.keywords}
            handleDragOver={handleDragOver}
            handleDrop={handleDropKeyword}
          />
          {Object.keys(heading.keywords).length > 0 ? (
            heading.keywords.map((keyword, indexKey) => (
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
            <span className='capitalize text-gray-200 font-semibold'>H{heading.type + 1}</span>
            <ButtonAddForDrag
              name={heading.name}
              type={heading.type}
              keyword={heading.keywords}
              handleDragOver={handleDragOver}
              handleDrop={handleDropHeading}
              heading={heading}
            />
          </div>
          {heading.headings.length > 0 ? (
            heading.headings.map((newHeading, index) => (
              <div className='ml-2 flex items-center gap-2' key={index}>
                <span>{newHeading.name}</span>
              </div>
            ))
          ) : (
            <div className='flex items-center ml-4'>
              <span className='text-xs text-gray-100'>'N/A'</span>
            </div>
          )}
        </div>
      </div>
      {heading.headings.length > 0 ? (
        <div>
          {heading.headings.map((subheading, subIndex) => (
            <InHeadingConstruction
              handleDragOver={handleDragOver}
              handleDropKeyword={handleDropKeyword}
              handleDropHeading={handleDropHeading}
              key={subIndex}
              heading={subheading}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default InHeadingConstruction;
