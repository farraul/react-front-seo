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

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('word', words[index]);
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
          <div onDragStart={(event) => handleDragStart(event, 0)} draggable>
            <p className=''>{words[0]}</p>
          </div>
          <div onDragStart={(event) => handleDragStart(event, 1)} draggable>
            <p>{words[1]}</p>
          </div>
          <div className='mb-16' onDragStart={(event) => handleDragStart(event, 2)} draggable>
            <p>{words[2]}</p>
          </div>

          {Object.keys(droppableAreas) &&
            Object.keys(droppableAreas).map((area, areaIndex) => (
              <div key={uuidv4}>
                <div className='bg-blue-600 p-10 text-white rounded-md'>
                  <div className='pl-10'>
                    <p className=' py-2 text-3xl font-bold'>
                      {droppableAreas[area].value}
                      <span className='text-gray-400 ml-5'>{area}</span>
                    </p>
                    <div className='ml-10'>
                      <p className='font-bold'>Kewyords</p>
                      {Object.keys(droppableAreas[area]['keywords']).map((keyword) => {
                        return <p className=''>{keyword}</p>;
                      })}

                      <div
                        key={area}
                        onDragOver={handleDragOver}
                        onDrop={(event) => handleDroph1(event, area, areaIndex)}
                      >
                        <button className='py-2 text-white border-gray-300 border-2 px-6 mt-4 rounded-md border-dotted'>
                          {`Añadir keywords aquí`}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className=' ml-20'>
                    {Object.keys(droppableAreas[area]['headings']).length
                      ? Object.keys(droppableAreas[area]['headings']).map((heading: any) => {
                          console.log({ heading });
                          return (
                            <div className='pl-20 mt-10'>
                              {/* <span className='font-bold text-gray-400 text-2xl py-2 mt-2'>H2</span> */}
                              {Object.keys(droppableAreas[area]['headings'][heading]).map(
                                (headingValue: any) => {
                                  console.log(headingValue);
                                  return (
                                    <p className=' p-1' key={uuidv4}>
                                      {headingValue}
                                      <span className='font-bold text-gray-400 text-xl ml-5'>
                                        H2
                                      </span>
                                    </p>
                                  );
                                },
                              )}
                            </div>
                          );
                        })
                      : null}
                    <div
                      className='pl-20 '
                      key={area}
                      onDragOver={handleDragOver}
                      onDrop={(event) => handleDrop(event, area, areaIndex)}
                    >
                      <button className='py-2 text-white border-gray-300 border-2 px-6 mt-4 rounded-md border-dotted'>
                        {`Añadir H2 aquí`}
                      </button>
                    </div>
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
