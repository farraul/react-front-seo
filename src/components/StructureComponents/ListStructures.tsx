import React, { useState } from 'react';
import { Button } from '../PrimitiveElements/Button';

export const ListStructures = ({ structure, droppableAreas, setStructureSelected }: any) => {
  console.log('ListStructures  structure:', structure);

  const [isOpenCreateIntention, setIsOpenCreateIntention] = useState(false);

  const showStructure = (intention: string) => {
    setStructureSelected(intention);
  };
  return (
    <div className=' flex  flex-row flex-wrap gap-x-2 gap-y-2'>
      {Object.entries(structure).map(([intention, vol]) => (
        <div key={intention}>
          {droppableAreas[intention] && (
            <div className=''>
              <Button
                className='bg-primary w-72 h-20 flex  items-center justify-center rounded-2xl flex-col text-xl text-white'
                onClick={() => showStructure(intention)}
              >
                {intention}
              </Button>
            </div>
          )}
        </div>
      ))}
      <div key='one'>
        <Button
          className='bg-gray-200 border-gray-500 border-2 w-72 h-20 flex  items-center justify-center rounded-2xl flex-col text-xl text-black border-dashed'
          onClick={() => {
            setIsOpenCreateIntention(true);
          }}
        >
          Nueva Estructura
        </Button>
      </div>
    </div>
  );
};
