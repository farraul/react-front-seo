import React, { useState } from 'react';
import { PanelResult } from 'src/components/Estructure/PanelResult';
import { v4 as uuidv4 } from 'uuid';

const EstructurePage = () => {
  const [words, setWords] = useState(['Que es el seo?', 'Seo para empresas', 'Inicio para el seo']);
  const [droppableAreas, setDroppableAreas] = useState<any>({
    h1: {
      value: 'Seo',
      headings: {
        h2: {
          'Seo local': {},
          'Seo online': {},
          'Seo presencial': {},
        },
      },
      keywords: {},
    },
  });
  console.log(droppableAreas['h1']['headings']);
  console.log('EstructurePage  droppableAreas:', droppableAreas);

  const handleDragStart = (event, word) => {
    event.dataTransfer.setData('word', word);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDroph1 = (event, tag, areaIndex) => {
    const word = event.dataTransfer.getData('word');
    const wordIndex = words.indexOf(word);

    if (wordIndex !== -1) {
      const newWords = [...words];
      newWords.splice(wordIndex, 1);
      setWords(newWords);

      const newKeyword = { ...droppableAreas[tag]['keywords'], [word]: {} };

      setDroppableAreas((prevState: any) => ({
        ...prevState,
        [tag]: {
          ...prevState[tag],
          ['keywords']: {
            ...newKeyword,
          },
        },
      }));
    }
  };

  const handleDrop = (event, tag, areaIndex) => {
    const word = event.dataTransfer.getData('word');
    const wordIndex = words.indexOf(word);

    if (wordIndex !== -1) {
      const newWords = [...words];
      newWords.splice(wordIndex, 1);
      setWords(newWords);

      const newKeyword = { ...droppableAreas[tag]['headings']['h2'], [word]: {} };

      setDroppableAreas((prevState: any) => ({
        ...prevState,
        [tag]: {
          ...prevState[tag],
          ['headings']: {
            ...prevState[tag]['headings'],
            ['h2']: {
              ...prevState[tag]['headings']['h2'],
              ...newKeyword,
            },
          },
        },
      }));
    }
  };

  return (
    <section>
      <div className='mt-16 mb-1 flex'>
        <div className='w-1/2'>
          <h1 className='font-bold text-3xl mb-6'> Nuevas palabras </h1>
          <p className='mb-8'>Pincha y arrastra las palabras:</p>
          {words.map((word) => {
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

          {/* <div onDragStart={(event) => handleDragStart(event, 0)} draggable>
            <p className=''>{words[0]}</p>
          </div>
          <div onDragStart={(event) => handleDragStart(event, 1)} draggable>
            <p>{words[1]}</p>
          </div>
          <div className='mb-16' onDragStart={(event) => handleDragStart(event, 2)} draggable>
            <p>{words[2]}</p>
          </div> */}
          {Object.keys(droppableAreas) &&
            Object.keys(droppableAreas).map((area, areaIndex) => (
              <div key={uuidv4}>
                <div className='bg-blue-600 px-20 py-10 text-white rounded-md mt-10'>
                  <div className=''>
                    <p className=' py-2 text-3xl font-bold'>
                      <span className='text-gray-400 '>{area}</span>
                      <span className='ml-5 text-2xl'> {droppableAreas[area].value}</span>
                    </p>
                    <div className=' flex'>
                      <div className='font-bold  text-gray-400 flex items-center'>Keyyord</div>
                      <button
                        onDragOver={handleDragOver}
                        onDrop={(event) => handleDroph1(event, area, areaIndex)}
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

                  <div className=' ml-20'>
                    {Object.keys(droppableAreas[area]['headings']).length
                      ? Object.keys(droppableAreas[area]['headings']).map((heading: any) => {
                          console.log({ heading });
                          return (
                            <>
                              <div className='flex mt-4'>
                                <span className='font-bold text-gray-400 text-xl ml-5 flex items-center'>
                                  H2
                                </span>

                                <button
                                  key={area}
                                  onDragOver={handleDragOver}
                                  onDrop={(event) => handleDrop(event, area, areaIndex)}
                                  className='py-2 ml-6  text-gray-400 border-gray-300 border-2 px-4  rounded-md border-dotted 	'
                                >
                                  {`+`}
                                </button>
                                <div className='pl-4 '>
                                  {/* <span className='font-bold text-gray-400 text-2xl py-2 mt-2'>H2</span> */}
                                  {Object.keys(droppableAreas[area]['headings'][heading]).map(
                                    (headingValue: any) => {
                                      console.log(headingValue);
                                      return (
                                        <p className=' p-1' key={uuidv4}>
                                          {headingValue}
                                        </p>
                                      );
                                    },
                                  )}
                                </div>
                              </div>
                            </>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className='w-1/2'>
          <PanelResult droppableAreas={droppableAreas} />
        </div>
      </div>
    </section>
  );
};

export default EstructurePage;
