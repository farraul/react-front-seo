import { Seo, SeoHeadingWithName } from 'src/models/seo';
import { v4 as uuidv4 } from 'uuid';
import InHeadingResult from './ConstructionPanel/DragAndDrop/InHeadingResult';
import { CustomInput } from 'src/components/PrimitiveElements';

interface Props {
  droppableAreas: SeoHeadingWithName;
}

export const ResultPanel = ({ droppableAreas }: Props) => {
  return (
    <div className=' flex flex-col  h-full pt-4  rounded-sm  border border-black'>
      <div className=' border border-black h-10 rounded-sm flex items-center px-4 mx-4 '>
        <p>/casa/sofa</p>
      </div>
      <div className='flex flex-col h-full justify-between '>
        <div className='px-6'>
          <div className='flex items-center mt-10 pl-2'>
            {droppableAreas.name ? (
              <p className='text-4xl font-bold'>{droppableAreas.name}</p>
            ) : (
              <p>[ ]</p>
            )}
            <span className='ml-4 flex items-center text-base '>H{droppableAreas.type}</span>
          </div>

          <div className='flex flex-wrap ml-4 mb-4 flex-col flex-start mt-2'>
            {Object.keys(droppableAreas.keywords).length > 0 ? (
              droppableAreas.keywords.map((keyword, indexKey) => (
                <div className='ml-2  gap-2' key={indexKey}>
                  {Object.entries(keyword).map((word, index) => (
                    <div className='flex gap-2 wrap' key={index}>
                      <span className=''>{word[0]} </span>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className='flex items-center ml-4'>
                <span className='text-xs text-gray-100'></span>
              </div>
            )}
          </div>
          <div className='flex ml-4 '>
            <div>
              {droppableAreas.headings.length > 0 ? (
                droppableAreas.headings.map((heading, index) => (
                  <div className='ml-2 flex items-center gap-2' key={index}>
                    <InHeadingResult key={heading.name} heading={heading} />
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
        <div>
          {/* //check */}
          <div className='bg-gray-100 py-4 px-8 '>
            <div className='flex'>
              <div className='w-32'>Title</div>
              <div className='w-full'>
                <span>EL PAÍS: el periódico globalEL PAÍS: el periódico global</span>
              </div>
            </div>

            <div className='flex mt-4'>
              <div className='w-32'>Meta</div>
              <div className='w-full'>
                <span>
                  Noticias de última hora sobre la actualidad en España y el mundo: política,
                  economía, deportes, cultura, sociedad, tecnología, gente.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
