import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const PanelResult = ({ droppableAreas }: any) => {
  console.log('PanelResult  droppableAreas:', droppableAreas);

  return (
    <div className='border-black border-4 mx-20 rounded-sm p-20'>
      {Object.keys(droppableAreas) &&
        Object.keys(droppableAreas).map((area, areaIndex) => (
          <div key={uuidv4}>
            <div className='pl-5'>
              <div className=''>
                <p className='font-bold py-2 text-4xl'>
                  {droppableAreas[area].value}
                  <span className='text-gray-400 ml-5'>H1</span>
                </p>
                {Object.keys(droppableAreas[area]['keywords']).length ? (
                  <div className=' mt-10 ml-20'>
                    {Object.keys(droppableAreas[area]['keywords']).map((keyword) => {
                      return (
                        <p className='text-lg font-bold mr-10'>
                          {keyword}{' '}
                          <span className='text-gray-400 ml-5 text-lg font-bold'>Keywords</span>{' '}
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
                                <p className=' p-2 text-2xl font-bold' key={uuidv4}>
                                  {headingValue}
                                  <span className='text-gray-400 ml-5 text-lg font-bold'>H2</span>
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
