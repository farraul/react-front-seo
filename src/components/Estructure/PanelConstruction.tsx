import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const PanelConstruction = ({
  droppableAreas,
  handleDragOver,
  handleDropKeyword,
  handleDropHeading,
}: any) => {
  return (
    <>
      {Object.keys(droppableAreas) &&
        Object.keys(droppableAreas).map((area) => {
          const type = droppableAreas[area]['type'];

          return (
            <div key={area}>
              <div className='bg-blue-600 px-20 py-10 text-white rounded-md mt-10'>
                <div className=''>
                  <p className=' py-2 text-3xl font-bold'>
                    <span className=''>{area}</span>
                    <span className='ml-5 text-2xl text-gray-400 '>
                      {' '}
                      H{droppableAreas[area]['type']}
                    </span>
                  </p>
                  <div className=' flex ml-5 '>
                    <div className='font-bold  text-gray-400 flex items-center w-16'>Kewyord</div>
                    <button
                      onDragOver={handleDragOver}
                      onDrop={(event) => handleDropKeyword(event, area)}
                      className='py-2 ml-6  text-gray-400 border-gray-300 border-2 px-4  rounded-md border-dotted '
                    >
                      {'+'}
                    </button>
                    <div className='ml-5 '>
                      {Object.keys(droppableAreas[area]['keywords']).map((keyword) => {
                        return <p className=''>{keyword}</p>;
                      })}
                    </div>
                  </div>
                </div>

                <div className=' flex mt-2'>
                  <div className='flex'>
                    <span className='font-bold text-gray-400 ml-5 flex items-center w-16'>
                      H {droppableAreas[area]['type'] + 1}
                    </span>

                    <button
                      key={area}
                      onDragOver={handleDragOver}
                      onDrop={(event) => handleDropHeading(event, area, type, droppableAreas[area])}
                      className='py-2 ml-6  text-gray-400 border-gray-300 border-2 px-4  rounded-md border-dotted 	'
                    >
                      {`+`}
                    </button>
                    <div className='ml-5 '>
                      {Object.keys(droppableAreas[area]['headings']).map((heading) => {
                        return <p className=''>{heading}</p>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
