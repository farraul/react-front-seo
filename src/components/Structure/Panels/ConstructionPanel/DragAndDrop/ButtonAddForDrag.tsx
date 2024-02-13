import React from 'react';
import { SeoHeadingWithName } from 'src/models/seo';

type typeHandleDropKeyword = (
  event: React.DragEvent<HTMLElement>,
  name: string,
  type: number,
  heading: any,
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

const ButtonAddForDrag = ({ name, type, handleDrop, handleDragOver, heading, keyword }: Props) => {
  console.log('ButtonAddForDrag  heading:', heading);
  console.log(keyword);
  console.log('in');

  const actionsHeading = {
    keyword: handleDrop as typeHandleDropKeyword,
    heading: handleDrop as typeHandleDropHeading,
  };
  console.log(heading);
  return (
    <button
      onDragOver={handleDragOver}
      onDrop={(event) =>
        heading
          ? actionsHeading['heading'](event, type, heading)
          : actionsHeading['keyword'](event, name, type, heading, keyword)
      }
      className={`py-2 ml-6 w-fit border-gray-700 text-gray-700 border-2 px-4 rounded-md  h-full`}
    >
      {`?`}
    </button>
  );
};

export default ButtonAddForDrag;
