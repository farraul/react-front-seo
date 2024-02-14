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
    heading: any,
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
    <div className=' px-4 text-white'>
      <div className=' flex flex-col mt-2'>
        <div className='flex gap-2 items-center'>
          <p className=' text-blue-700 '>{heading.name}</p>
          <span className='font-bold  ml-5 flex items-center '></span>
        </div>
        <div className='ml-10 pt-2'>
          <div className='flex justify-between items-center w-fit '>
            <div className='flex item'>
              <span className='capitalize text-sm italic w-16 text-green-800 font-bold'>
                keywords
              </span>
              <ButtonAddForDrag
                name={heading.name}
                type={heading.type}
                keyword={heading.keywords}
                handleDragOver={handleDragOver}
                handleDrop={handleDropKeyword}
              />
            </div>
            <div className='flex'>
              {Object.keys(heading.keywords).length > 0 ? (
                heading.keywords.map((keyword, indexKey) => (
                  <div className='ml-2 flex items-center gap-2 w-full' key={indexKey}>
                    {Object.entries(keyword).map((word, index) => (
                      <div className='flex gap-2 w-full' key={index}>
                        {/* <span className='text-xs text-gray-200'>[{indexKey + 1}]</span> */}
                        <span className='w-max text-blue-700'>{word[0]}</span>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div className='flex items-center ml-4 '>
                  <span className='text-xs text-gray-100'></span>
                </div>
              )}
            </div>
          </div>
          <div className='flex  mt-2'>
            <div className='flex w-36 '>
              <div className='capitalize  text-sm italic w-16 py-2 h-full flex items-center justify-end text-green-800 font-bold'>
                H{heading.type + 1}
              </div>
              <div className='h-full'>
                <ButtonAddForDrag
                  name={heading.name}
                  type={heading.type}
                  keyword={heading.keywords}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDropHeading}
                  heading={heading}
                />
              </div>
            </div>
            <div>
              {heading.headings.length > 0 ? (
                heading.headings.map((newHeading, index) => (
                  <div className='ml-2 flex items-center gap-2' key={index}>
                    <span>
                      <InHeadingConstruction
                        handleDragOver={handleDragOver}
                        handleDropKeyword={handleDropKeyword}
                        handleDropHeading={handleDropHeading}
                        key={index}
                        heading={newHeading}
                      />
                    </span>
                  </div>
                ))
              ) : (
                <div className='flex items-center ml-4'>
                  <span className='text-xs text-gray-100'></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {heading.headings.length > 0 ? (
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
      ) : null} */}
    </div>
  );
};

export default InHeadingConstruction;
