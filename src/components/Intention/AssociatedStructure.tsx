import { useState } from 'react';
import { ExternalLinkIcon } from '../Icons/ExternalLinkIcon';
import { PlusIcon } from '../Icons/PlusIcon';
import { CreateIntentionModal } from '../Modals/CreateIntentionModal';
import { CreateStructureModal } from '../Modals/CreateStructureModal';

export const AssociatedStructure = () => {
  const [isOpenCreateStructure, setIsOpenCreateStructure] = useState(false);

  const closeCreateStructure = () => {
    setIsOpenCreateStructure(false);
  };

  return (
    <>
      <div className='bg-blue-900 px-4  flex justify-around py-5'>
        <div className='text-center  text-gray-400 flex items-center'>
          <div className='flex border-dashed border-white border px-1 py-1 '>
            <span
              className='cursor-pointer flex'
              onClick={() => {
                setIsOpenCreateStructure(true);
              }}
            >
              <PlusIcon width='w-4' height='' />
            </span>
          </div>
          <p className=' ml-2'>Estrucura asociada</p>
        </div>
        <div className=''>
          <div className='flex items-center'>
            <div className='text-white mr-2'>Estructura 1</div>
            <span onClick={() => setIsOpenCreateStructure(true)}>
              <ExternalLinkIcon width='w-6' />
            </span>
          </div>
        </div>
      </div>
      <div>
        <CreateStructureModal
          isOpenCreateIntention={isOpenCreateStructure}
          closeModalEditKeyword={closeCreateStructure}
        />
      </div>
    </>
  );
};
