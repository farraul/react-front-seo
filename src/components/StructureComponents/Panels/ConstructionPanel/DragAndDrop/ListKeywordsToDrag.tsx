import React from 'react';
import { handleDragStart } from 'src/utilities/dragAndDropHelper';
import { v4 as uuidv4 } from 'uuid';

export const ListKeywordsToDrag = ({ words }: any) => {
  return (
    <div key={uuidv4()}>
      <p className='mb-8'>Pincha y arrastra las palabras:</p>
      {words.map((word: string) => {
        return (
          <span
            className='border-2 ml-4 py-2 px-4'
            onDragStart={(event) => handleDragStart(event, word)}
            draggable
          >
            <span className=''>{word}</span>
          </span>
        );
      })}
    </div>
  );
};
