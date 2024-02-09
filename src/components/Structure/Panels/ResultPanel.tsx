import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ResultPanel = ({ droppableAreas }: any) => {
  console.log('PanelResult  droppableAreas:', Object.keys(droppableAreas));

  return (
    <div className='border-black border-4 mx-20 rounded-sm p-20'>
      {Object.keys(droppableAreas) &&
        Object.keys(droppableAreas).map((area, areaIndex) => (
          <div key={uuidv4}>
            <div className='pl-5'>
              <div className=''>
                <p className=' py-2'>
                  <span className='font-bold  text-4xl'>{Object.keys(droppableAreas)[0]}</span>
                  <span className='text-gray-400 ml-5 text-2xl'>H1</span>
                </p>
                {Object.keys(droppableAreas[area]['keywords']).length ? (
                  <div className=' mt-10 ml-20'>
                    {Object.keys(droppableAreas[area]['keywords']).map((keyword) => {
                      return (
                        <p className='text-lg  mr-10'>
                          <span className='font-bold'> {keyword}</span>{' '}
                          <span className='text-gray-400 ml-5 text-sm'>Keywords</span>
                        </p>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <div className='mt-6 ml-6'>
                {Object.keys(droppableAreas[area]['headings']).length
                  ? Object.keys(droppableAreas[area]['headings']).map((heading: any) => {
                      return (
                        <div className=''>
                          {Object.keys(droppableAreas[area]['headings'][heading]).map(
                            (headingValue: any) => {
                              return (
                                <p className=' p-2 text-2xl ' key={uuidv4}>
                                  <span className='font-bold'>{headingValue}</span>
                                  <span className='text-gray-400 ml-5 text-lg '>H2</span>
                                </p>
                              );
                            },
                          )}
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
