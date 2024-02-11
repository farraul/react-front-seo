import React from 'react';
import { SeoHeadingWithName } from 'src/models/seo';

type typeHandleDropKeyword = (
  event: React.DragEvent<HTMLElement>,
  name: string,
  type: number,
  keyword: Record<string, number>[],
) => void;

type typeHandleDropHeading = (
  event: React.DragEvent<HTMLElement>,
  type: number,
  heading: SeoHeadingWithName,
) => void;

interface Props {
  name: string;
  type: number;
  keyword: Record<string, number>[];
  handleDragOver: (event: React.DragEvent<HTMLElement>) => void;
  handleDrop: typeHandleDropHeading | typeHandleDropKeyword;
  heading?: SeoHeadingWithName;
}

const ButtonAddForDrag = ({ type, keyword, name, heading, handleDrop, handleDragOver }: Props) => {
  const headingHeight = heading && heading.headings.length + 4;
  const actionsHeading = {
    keyword: handleDrop as typeHandleDropKeyword,
    heading: handleDrop as typeHandleDropHeading,
  };
  return (
    <button
      onDragOver={handleDragOver}
      onDrop={(event) =>
        heading
          ? actionsHeading['heading'](event, type, heading)
          : actionsHeading['keyword'](event, name, type, keyword)
      }
      className={`py-2 ml-6 w-fit  text-gray-400 border-gray-300 border-2 px-4 rounded-md border-dotted h-full`}
    >
      {`+`}
    </button>
  );
};

export default ButtonAddForDrag;
