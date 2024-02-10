import React from 'react';
import { SeoHeadingWithName } from 'src/models/seo';

interface Props {
  heading: SeoHeadingWithName;
  index?: number;
}

const InHeadingResult = ({ heading, index }: Props) => {
  return (
    <div className={`flex flex-col gap-2 pl-${index ? index + 1 : 0}`}>
      <span className='font-semibold'>{String(heading.name)}</span>
      <span className='font-light text-gray-500'>H{String(heading.type)}</span>
      <div className='flex gap-2 text-base text-gray-500'>
        {heading.keywords.map((keyword, index) => (
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
      {heading.headings.length > 0 ? (
        <div>
          {heading.headings.map((subheading, subIndex) => (
            <InHeadingResult key={subIndex} heading={subheading} index={subIndex + 2} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default InHeadingResult;
