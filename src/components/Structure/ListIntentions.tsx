import React, { useState } from 'react';
import { Button } from '../PrimitiveElements/Button';

export const ListIntentions = ({ intention, setStructureSelected }: any) => {
  console.log('ListStructures  structure:', intention);

  const [isOpenCreateIntention, setIsOpenCreateIntention] = useState(false);

  const showStructure = (intention: string) => {
    setStructureSelected(intention);
  };
  return (
    <div className=' flex  flex-row flex-wrap gap-x-2 gap-y-2'>
      {Object.entries(intention).map(([intention]) => {
        console.log(intention);
        return (
          <div key={intention}>
            {intention && (
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
        );
      })}
      <div key='one'></div>
    </div>
  );
};
